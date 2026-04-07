import { useEffect, useState, useCallback } from "react";
import F1 from "@/assets/F1.jpeg";
import F2 from "@/assets/F2.jpeg";
import F3 from "@/assets/F3.jpeg";
import FD1 from "@/assets/FD1.jpeg";
import FD2 from "@/assets/FD2.jpeg";
import FD3 from "@/assets/FD3.jpeg";
import oceanVideo from "@/assets/ocean.mp4";

interface Scene {
  type: "title" | "photos" | "text" | "code" | "final" | "video";
  duration: number; // ms visible
  images?: string[];
  videoUrl?: string;
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
    duration: 6000,
    images: [F1, F2, F3],
    text: "In every frame, your beauty makes the world brighter..",
  },
  {
    type: "text",
    duration: 6000,
    text: "Wishing you a day filled with love, laughter, and everything that makes you smile.",
    subtext: "May this year bring you happiness, success, and unforgettable memories.",
  },
  {
    type: "video",
    duration: 12000,
    videoUrl: oceanVideo,
    text: "A special message in the sand...",
  },
  {
    type: "final",
    duration: 8000,
    text: "Happy Birthday Foos ❤️",
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
          </div>
        );

      case "photos":
        return (
          <div className="text-center flex flex-col items-center justify-center space-y-6 md:space-y-10 max-h-[85vh]">
            <div className="flex items-center justify-center gap-2 md:gap-4 px-4 w-full">
              {scene.images?.map((src, i) => {
                const isMiddle = i === 1;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl overflow-hidden box-glow transition-all duration-[1000ms] ease-out ${isMiddle
                      ? "w-[40vw] max-w-[380px] h-[50vh] z-10 scale-105"
                      : "w-[20vw] max-w-[180px] h-[35vh] opacity-60"
                      }`}
                    style={{
                      opacity: phase === "visible" ? (isMiddle ? 1 : 0.6) : 0,
                      transform: phase === "visible"
                        ? (isMiddle ? "scale(1.05) translateY(0)" : "scale(0.9) translateY(20px)")
                        : "scale(0.8) translateY(40px)",
                      transitionDelay: `${300 + i * 200}ms`,
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className={`w-full h-full ${isMiddle ? "object-contain bg-black/20" : "object-cover"}`}
                      style={{
                        transition: `transform ${scene.duration}ms ease-out`,
                        transform: phase === "visible" ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="space-y-2 px-6">
              <p className="font-display text-xl md:text-3xl text-foreground text-glow italic leading-tight max-w-2xl">
                {scene.text}
              </p>
              {scene.subtext && (
                <p className="font-display text-lg md:text-xl text-primary/80 italic text-glow">
                  {scene.subtext}
                </p>
              )}
            </div>
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

      case "video":
        return (
          <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
            <div className="relative rounded-2xl overflow-hidden box-glow aspect-video bg-black">
              <video
                src={scene.videoUrl}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => {
                  // Optional: could trigger next scene here
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
            <p className="font-display text-xl md:text-2xl text-foreground/80 italic">
              {scene.text}
            </p>
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
