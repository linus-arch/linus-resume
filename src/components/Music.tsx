import MusicGallery from "./MusicGallery";

const Music = () => {
  return (
    <section id="music" className="pt-28 pb-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Music</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          Personal sketches, textures, and process tracks.
        </p>

        <MusicGallery />
      </div>
    </section>
  );
};

export default Music;
