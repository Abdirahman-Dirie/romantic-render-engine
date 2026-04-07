import { useEffect, useState } from "react";

const BirthdayTitle = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div
        className={`text-center space-y-4 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-display text-5xl md:text-8xl font-bold text-foreground text-glow">
          Happy Birthday 🎉
        </h2>
        <p className="font-display text-2xl md:text-4xl text-primary italic text-glow">
          7 April ❤️
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground font-mono-code text-sm">
          <span className="text-accent">const</span> love <span className="text-accent">=</span>{" "}
          <span className="text-primary">Infinity</span>;
        </div>
      </div>
    </section>
  );
};

export default BirthdayTitle;
