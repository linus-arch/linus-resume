import { certifications } from "@/config/resume-data";

const Certifications = () => {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">Education & Certifications</h2>
        <div className="space-y-4">
          {certifications.map((cert, index) => {
            const content = (
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{cert.name}</h3>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
              </div>
            );
            return cert.url ? (
              <a
                key={index}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-foreground/70 transition-colors"
              >
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
