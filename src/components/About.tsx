import SlashNumber from "./SlashNumber";
import EdgeLabel from "./EdgeLabel";
import { useScrollEntrance } from "@/hooks/useScrollEntrance";
import { experienceSummaryQuotes } from "@/config/resume-data";

const About = () => {
  const ref = useScrollEntrance();

  return (
    <section className="section-dark grain" ref={ref} style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <EdgeLabel text="About" />

      <div className="absolute bottom-6 left-6" style={{ marginLeft: "var(--margin-page)" }}>
        <SlashNumber number="03" />
      </div>

      <div className="split-55-45 w-full">
        {/* Left — pull quote */}
        <div className="enter-on-scroll">
          <p className="pull-quote pull-quote--light">
            {experienceSummaryQuotes[0]}
          </p>
        </div>

        {/* Right — body text in 2 columns */}
        <div className="enter-on-scroll">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-6)",
          }}>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "rgba(245, 242, 238, 0.7)",
              lineHeight: 1.65,
              maxWidth: "320px",
            }}>
              {experienceSummaryQuotes[1]}
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "rgba(245, 242, 238, 0.7)",
              lineHeight: 1.65,
              maxWidth: "320px",
            }}>
              {experienceSummaryQuotes[2]}
            </p>
          </div>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            color: "rgba(245, 242, 238, 0.5)",
            lineHeight: 1.65,
            marginTop: "var(--space-6)",
            maxWidth: "50ch",
          }}>
            {experienceSummaryQuotes[3]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
