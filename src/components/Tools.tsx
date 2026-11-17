import { ArrowUpRight } from "lucide-react";
import { toolGroups } from "@/config/resume-data";

const Tools = () => {
  return (
    <section id="tools" className="score-section tools-section">
      <div className="score-section__header">
        <h2 className="score-heading">Tools I reach for.</h2>
        <p className="score-lede">
          The current instrument panel across music, interface design, and product code.
        </p>
      </div>

      <div className="tools-index" aria-label="Tools by category">
        {toolGroups.map((group, index) => (
          <article className="tools-row" key={group.category}>
            <div className="tools-row__number">0{index + 1}</div>
            <div className="tools-row__category">
              <h3>{group.category}</h3>
              <p>{group.description}</p>
            </div>
            <ul className="tools-row__list">
              {group.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <ArrowUpRight className="tools-row__arrow" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Tools;
