import OpenExplorationsCarousel from "./OpenExplorationsCarousel";

const OpenExplorations = () => {
  return (
    <section id="explorations" className="score-section explorations-section">
      <div className="explorations-section__header">
        <h2 className="score-heading">Open Explorations</h2>
        <p className="score-lede">
          Ideas I'm actively exploring and evolving. If any of these resonate, let's collaborate.
        </p>
      </div>

      <OpenExplorationsCarousel />
    </section>
  );
};

export default OpenExplorations;
