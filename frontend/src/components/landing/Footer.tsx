import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contact" className="container py-16">
      <div className="float-card p-10 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">EduMonitor.<span className="text-primary">.</span></span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            AI-powered education platform helping students, parents and teachers thrive together.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-border grid place-items-center hover:bg-accent transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#dashboards" className="hover:text-foreground">Dashboards</a></li>
            <li><Link to="/login" className="hover:text-foreground">Get Started</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Pricing</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">© 2026 EduMonitor. Crafted with ✦ for education.</p>
    </footer>
  );
}
