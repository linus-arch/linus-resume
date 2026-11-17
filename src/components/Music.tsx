import { ExternalLink } from "lucide-react";
import { musicDestinations } from "@/config/resume-data";
import { Fractal } from "@/components/ui/fractal";

const Music = () => {
  return (
    <section id="music" className="score-section music-section">
      <Fractal
        className="music-section__fractal"
        colors={["#97A137", "#F48E12", "#E3A5BF", "#767ECC"]}
        placement="center"
      />
      <div className="music-section__intro">
        <h2 className="score-heading">Current Music Projects</h2>
        <p className="music-section__certificate">
          I hold a certificate in Electronic Music Production &amp; Performance from Catalyst - Institute of Arts &amp; Technology. These are my ongoing projects.
        </p>
      </div>

      <div className="music-diptych">
        {musicDestinations.map((destination) => (
          <a
            className={`music-sleeve ${
              destination.color === "red" ? "music-sleeve--red" : "music-sleeve--blue"
            }`}
            href={destination.url}
            target="_blank"
            rel="noreferrer"
            key={destination.slug}
          >
            <span className="music-sleeve__topline">
              <span>{destination.slug}</span>
              <ExternalLink aria-hidden="true" />
            </span>
            <span className="music-sleeve__art" aria-hidden="true">
            <span className="music-sleeve__orbit music-sleeve__orbit--one" />
            <span className="music-sleeve__orbit music-sleeve__orbit--two" />
            </span>
            <span className="music-sleeve__bottomline">
              <strong>{destination.title}</strong>
              <span>{destination.descriptor}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Music;
