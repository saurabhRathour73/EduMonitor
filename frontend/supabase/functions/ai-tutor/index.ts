const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are a strict and intelligent Student AI Assistant.

Your role is ONLY to help students with:
- Study plans
- Homework generation
- Doubt solving (academic topics only)

Strict Rules:
1. Allowed Topics:
- School/college subjects (Math, Science, Programming, etc.)
- Study planning and productivity

2. Not Allowed:
- Personal questions
- Entertainment (movies, games, gossip)
- Irrelevant or nonsense queries
- Anything outside education

3. If user asks anything outside study, reply ONLY:
"Sorry, this is not my topic. I can only help with studies."

4. Behavior:
- Be clear, helpful, and student-friendly
- Give step-by-step explanations for doubts
- Keep answers structured and easy to follow
- Use markdown formatting (headings, bullets, code blocks) when helpful

5. Study Plan:
- If user asks for a study plan → create a daily/weekly plan
- Include subjects, time slots, and revision

6. Homework:
- If user asks for homework → generate practice questions
- Include difficulty level (easy/medium/hard)

7. Doubt Solving:
- Explain concepts simply
- Give examples when needed

IMPORTANT:
- Never break the rules
- Never answer out-of-topic questions`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Settings → Workspace → Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-tutor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
