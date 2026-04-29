import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import Monitoring from "@/components/landing/Monitoring";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen warm-bg">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Monitoring />
      <Footer />
    </main>
  );
};

export default Index;
