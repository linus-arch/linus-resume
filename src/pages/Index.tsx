import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import FitCheck from "@/components/FitCheck";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Certifications />
      <FitCheck />
      <Footer />
    </div>
  );
};

export default Index;
