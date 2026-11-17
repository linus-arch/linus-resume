import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import AIChatDialog from "@/components/AIChatDialog";
import Music from "@/components/Music";
import OpenExplorations from "@/components/OpenExplorations";
import Tools from "@/components/Tools";
import Footer from "@/components/Footer";
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds";
import { experiences, personal } from "@/config/resume-data";

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="score-page">
      <Hero />

      <section id="experience" className="score-section work-section">
        <GradientBackground className="work-section__background" />
        <div className="score-section__header work-section__header">
          <h2 className="score-heading">A practice built around better questions.</h2>
          <p className="score-lede">
            I work between research, interface design, and implementation, helping complex ideas become usable products.
          </p>
        </div>
        <div className="work-index">
          {experiences.slice(0, 4).map((experience, index) => (
            <details className="work-row" key={`${experience.company}-${experience.period}`}>
              <summary className="work-row__summary">
                <span className="work-row__number">0{index + 1}</span>
                <span className="work-row__title">
                  <strong>{experience.company}</strong>
                  <span>{experience.role}</span>
                </span>
                <span className="work-row__period">{experience.period}</span>
                <span className="work-row__toggle" aria-hidden="true">+</span>
              </summary>
              <div className="work-row__details">
                <div className="work-row__description">
                  <p>{experience.bullets?.[0]}</p>
                </div>
                <a
                  className="work-row__preview"
                  href={experience.showMore?.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={experience.showMore?.link ? `Open ${experience.company} website` : undefined}
                  onClick={(event) => {
                    if (!experience.showMore?.link) event.preventDefault();
                  }}
                >
                  {experience.showMore?.image ? (
                    <img src={experience.showMore.image} alt={`${experience.company} website preview`} />
                  ) : (
                    <span>Website preview coming soon</span>
                  )}
                  {experience.showMore?.link && <span className="work-row__preview-link">Open website <ArrowUpRight aria-hidden="true" /></span>}
                </a>
              </div>
            </details>
          ))}
        </div>
        <div id="about" className="about-section">
        <GradientBackground
          className="about-section__background"
          noiseAlpha={28}
          noiseIntensity={0.65}
        />
        <div className="about-section__statement">
            <h2>I design the layer between technical systems and human understanding.</h2>
            <p>
              {personal.tagline}. My strongest work happens when a messy question needs structure, a team needs a clearer way to think, or a product needs to feel more human without hiding its complexity.
            </p>
            {chatOpen ? <AIChatDialog /> : (
              <button className="score-text-link" type="button" onClick={() => setChatOpen(true)}>
                Ask AI about me <ArrowUpRight aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>

      <Music />
      <OpenExplorations />
      <Tools />

      <section className="score-section contact-section">
        <h2 className="contact-section__heading">Have a difficult thing to make clearer?</h2>
        <Link className="contact-section__link" to="/#about">
          Let&apos;s talk <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
