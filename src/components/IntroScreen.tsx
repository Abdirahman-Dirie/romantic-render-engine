import { useState } from "react";

interface IntroScreenProps {
  onOpen: () => void;
}

const IntroScreen = ({ onOpen }: IntroScreenProps) => {
  const [fading, setFading] = useState(false);

  const handleClick = () => {
    setFading(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gradient-hero transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-8 animate-fade-in">
        <p className="text-muted-foreground text-lg tracking-widest uppercase font-light">
          a little surprise
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-foreground text-glow">
          I made something for you 🎁
        </h1>
        <button
          onClick={handleClick}
          className="mt-8 px-10 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg
            box-glow hover:scale-105 transition-all duration-300 animate-pulse-glow"
        >
          Open it ❤️
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
