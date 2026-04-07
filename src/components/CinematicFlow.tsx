import { useEffect, useState, useCallback } from "react";
import F1 from "@/assets/F1.jpeg";
import F2 from "@/assets/F2.jpeg";
import F3 from "@/assets/F3.jpeg";
import FD1 from "@/assets/FD1.jpeg";
import FD2 from "@/assets/FD2.jpeg";
import FD3 from "@/assets/FD3.jpeg";

interface Scene {
  type: "title" | "photos" | "text" | "code" | "final";
  duration: number; // ms visible
  images?: string[];
  text?: string;
  subtext?: string;
  lines?: string[];
}

const scenes: Scene[] = [
  {
    type: "title",
    duration: 4000,
    text: "Happy Birthday 🎉",
    subtext: "7 April ❤️",
  },
  {
    type: "photos",
    duration: 5000,
    images: [F1, F2, F3],
    text: "Celebrating another year of you...",
  },
  {
    type: "text",
    duration: 6000,
    text: "Wishing you a day filled with love, laughter, and everything that makes you smile.",
    subtext: "May this year bring you happiness, success, and unforgettable memories.",
  },
  {
    type: "photos",
    duration: 5000,
    images: [FD1, FD2, FD3],
    text: "To many more chapters in our story.",
  },
  {
    type: "code",
    duration: 6000,
    lines: [
      '> console.log("Happy Birthday ❤️");',
      "",
      "if (you.exist()) {",
      '  myWorld = "complete";',
      "}",
      "",
      "// return love; // always",
    ],
  },
  {
    type: "final",
    duration: 8000,
    text: "Happy Birthday to my everything ❤️",
    subtext: "Made with love & late-night commits 💻",
  },
];

const FADE_MS = 1000;

const CinematicFlow = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "visible" | "out">("in");
  const [typedLines, setTypedLines] = useState<string[]>([]);

  const scene = scenes[sceneIndex];

  // Scene lifecycle
  useEffect(() => {
    if (phase === "in") {
      const t = setTimeout(() => setPhase("visible"), FADE_MS);
      return () => clearTimeout(t);
    }
    if (phase === "visible") {
      const t = setTimeout(() => setPhase("out"), scene.duration);
      return () => clearTimeout(t);
    }
    if (phase === "out") {
      const t = setTimeout(() => {
        if (sceneIndex < scenes.length - 1) {
          setSceneIndex((i) => i + 1);
          setPhase("in");
          setTypedLines([]);
        }
      }, FADE_MS);
      return () => clearTimeout(t);
    }
  }, [phase, scene.duration, sceneIndex]);

  // Typing effect for code scenes
  useEffect(() => {
    if (scene.type !== "code" || phase === "out") return;
    const lines = scene.lines || [];
    let lineIdx = 0;
    let charIdx = 0;
    const buffer: string[] = [];

    const tick = () => {
      if (lineIdx >= lines.length) return;
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        buffer[lineIdx] = line.slice(0, charIdx);
        setTypedLines([...buffer]);
        charIdx++;
        setTimeout(tick, line === "" ? 80 : 30);
      } else {
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, 120);
      }
    };
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [sceneIndex, phase, scene.type, scene.lines]);

  const opacity = phase === "visible" ? 1 : phase === "in" ? 0 : 0;

  const renderScene = useCallback(() => {
    switch (scene.type) {
      case "title":
        return (
          <div className="text-center space-y-6">
            <h2 className="font-display text-5xl md:text-8xl font-bold text-foreground text-glow">
              {scene.text}
            </h2>
            <p className="font-display text-2xl md:text-4xl text-primary italic text-glow">
              {scene.subtext}
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground font-mono-code text-sm">
              <span className="text-accent">const</span> love{" "}
              <span className="text-accent">=</span>{" "}
              <span className="text-primary">Infinity</span>;
            </div>
          </div>
        );

      case "photos":
        return (
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 md:gap-6 px-4">
              {scene.images?.map((src, i) => (
                <div
                  key={i}
                  className="w-[28vw] max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden box-glow"
                  style={{
                    opacity: phase === "visible" ? 1 : 0,
                    transform:
                      phase === "visible" ? "scale(1)" : "scale(0.9)",
                    transition: `all ${FADE_MS}ms ease ${300 + i * 400}ms`,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out hover:scale-105"
                    style={{
                      transform: phase === "visible" ? "scale(1.05)" : "scale(1)",
                      transition: `transform ${scene.duration}ms ease-out`,
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="font-display text-xl md:text-2xl text-foreground/80 italic">
              {scene.text}
            </p>
          </div>
        );

      case "text":
        return (
          <div className="text-center space-y-4 max-w-xl mx-auto px-4">
            <p className="font-display text-3xl md:text-5xl text-foreground text-glow leading-tight">
              {scene.text}
            </p>
            <p className="font-display text-xl md:text-3xl text-primary italic text-glow">
              {scene.subtext}
            </p>
          </div>
        );

      case "code":
        return (
          <div className="max-w-xl w-full mx-auto rounded-2xl bg-card border border-border overflow-hidden box-glow-accent">
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-destructive/70" />
              <span className="w-3 h-3 rounded-full bg-accent/70" />
              <span className="w-3 h-3 rounded-full bg-accent/50" />
              <span className="ml-3 text-xs text-muted-foreground font-mono-code">
                love.ts
              </span>
            </div>
            <div className="p-6 font-mono-code text-sm md:text-base leading-relaxed min-h-[220px]">
              {typedLines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-muted-foreground/40 w-8 text-right mr-4 select-none text-xs">
                    {i + 1}
                  </span>
                  <span
                    className={
                      line.startsWith("//")
                        ? "text-muted-foreground"
                        : line.startsWith(">")
                          ? "text-primary"
                          : "text-foreground"
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "final":
        return (
          <div className="text-center space-y-6 max-w-lg mx-auto px-4">
            <p className="font-display text-3xl md:text-5xl text-foreground text-glow leading-tight">
              {scene.text}
            </p>
            <p className="text-muted-foreground text-sm font-mono-code">
              {scene.subtext}
            </p>
          </div>
        );

      default:
        return null;
    }
  }, [scene, phase, typedLines]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div
        className="w-full flex items-center justify-center px-4"
        style={{
          opacity,
          transition: `opacity ${FADE_MS}ms ease`,
        }}
      >
        {renderScene()}
      </div>

      {/* Progress dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {scenes.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === sceneIndex
                ? "w-6 bg-primary"
                : i < sceneIndex
                  ? "w-1.5 bg-primary/50"
                  : "w-1.5 bg-muted-foreground/30"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CinematicFlow;
