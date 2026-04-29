import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topic, mcqCount: rawCount, language: rawLang } = await req.json();
    if (!topic || typeof topic !== "string") {
      return new Response(JSON.stringify({ error: "topic is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const mcqCount = Math.min(25, Math.max(5, Number(rawCount) || 5));
    const language = ["English", "Hindi", "Hinglish"].includes(rawLang) ? rawLang : "English";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt =
      "You are an expert tutor. Generate clean, concise, exam-ready study material. Always call the provided tool with valid structured data. Strictly respect the requested language and counts.";

    const userPrompt = `
Generate an Enhanced AI Study Pack.
Topic: ${topic}
MCQ Count: ${mcqCount}
Language: ${language}

Requirements:
1. Short Notes:
- Strictly bullet points (8-10), clear and concise. No paragraphs.

2. MCQ Questions:
- Exactly ${mcqCount} MCQs. Each with 4 options. Provide the correct answer string that exactly matches one option.

3. Subjective Questions with Answers:
- Exactly 3 subjective questions, each with a clear concise answer.

4. Language Support:
- "Hindi" → full Hindi. "English" → full English. "Hinglish" → natural mix.

Important:
- Do NOT include ASCII diagrams.
- Follow bullet format strictly.
- Generate exactly ${mcqCount} MCQs.
`;

    const tool = {
      type: "function",
      function: {
        name: "generate_study_pack",
        description: "Generate bullet notes, MCQs, and subjective Q&A with answers for a topic.",
        parameters: {
          type: "object",
          properties: {
            notes: {
              type: "array",
              description: "8-10 concise bullet points.",
              items: { type: "string" },
              minItems: 6,
              maxItems: 12,
            },
            mcqs: {
              type: "array",
              minItems: mcqCount,
              maxItems: mcqCount,
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  options: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
                  answer: { type: "string", description: "Must exactly match one of the options." },
                },
                required: ["question", "options", "answer"],
                additionalProperties: false,
              },
            },
            subjective: {
              type: "array",
              minItems: 3,
              maxItems: 3,
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  answer: { type: "string" },
                },
                required: ["question", "answer"],
                additionalProperties: false,
              },
            },
          },
          required: ["notes", "mcqs", "subjective"],
          additionalProperties: false,
        },
      },
    };

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: "generate_study_pack" } },
      }),
    });

    if (!aiRes.ok) {
      if (aiRes.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiRes.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Settings → Workspace → Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await aiRes.text();
      console.error("AI gateway error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const call = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!call?.function?.arguments) {
      return new Response(JSON.stringify({ error: "AI did not return structured data" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const parsed = JSON.parse(call.function.arguments);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-study error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
