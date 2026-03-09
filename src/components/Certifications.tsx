import { Award, Shield, Cloud, Container, Lock, Server } from "lucide-react";
import { certifications } from "@/config/resume-data";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Cloud,
  Award,
  Container,
  Lock,
  Server,
};

const Certifications = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Certifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => {
            const Icon = iconMap[cert.icon] || Award;
            return (
              <div
                key={index}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-1 text-sm">{cert.name}</h3>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
