import { useEffect, useState } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
const captions = [
  "Us, always ❤️",
  "Morning rituals ☕",
  "Written in the stars ✨",
  "My whole heart 💛",
  "Our kind of night 🕯️",
  "For you, always 🌹",
];

const PhotoGallery = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4">
      <h3 className="font-display text-3xl md:text-4xl text-center text-foreground mb-12 text-glow-accent">
        Our Moments ✨
      </h3>

      {/* Main slideshow */}
      <div className="max-w-lg mx-auto relative aspect-square rounded-2xl overflow-hidden box-glow mb-8">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={captions[i]}
            loading="lazy"
            width={800}
            height={800}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        ))}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/80 to-transparent p-6">
          <p className="text-foreground font-display text-lg text-center">
            {captions[current]}
          </p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Grid preview */}
      <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 mt-10">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
              i === current ? "ring-2 ring-primary box-glow scale-105" : "opacity-60 hover:opacity-90"
            }`}
          >
            <img src={src} alt={captions[i]} loading="lazy" width={200} height={200} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
