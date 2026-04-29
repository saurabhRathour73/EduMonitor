import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useNavigate } from "react-router-dom";
import { ArrowRight, School, Shield, Zap, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft">
      <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <Button
            onClick={() => navigate("/auth")}
            className="rounded-full bg-gradient-primary shadow-glow transition-transform hover:scale-105"
          >
            Get Started <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </nav>

      <main className="container flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm text-accent-foreground animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          Super Admin Platform
        </div>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl animate-fade-in-up">
          Manage Schools{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Smartly
          </span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          A powerful Super Admin panel to manage schools efficiently. Monitor,
          create, and oversee institutions from one elegant dashboard.
        </p>

        <div
          className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="rounded-full bg-gradient-primary px-8 shadow-glow transition-transform hover:scale-105"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-2 px-8 transition-all hover:bg-accent"
          >
            Learn More
          </Button>
        </div>

        <div
          className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {[
            {
              icon: School,
              title: "School Management",
              desc: "Create and organize schools with unique IDs and track their status.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Instant actions with smooth animations and real-time updates.",
            },
            {
              icon: Shield,
              title: "Secure Control",
              desc: "Protected admin routes with confirmation flows for critical actions.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-border bg-card p-6 text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-transform group-hover:scale-110">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
