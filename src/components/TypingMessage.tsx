import { useEffect, useState, useRef } from "react";

const lines = [
  '> console.log("Happy Birthday, my love ❤️");',
  "",
  "// You are my favorite person",
  "// in every moment,",
  "// every function,",
  "// every line of my life.",
  "",
  "if (you.exist()) {",
  '  myWorld = "complete";',
  "}",
  "",
  "// No bugs in this love.",
  "// Just infinite loops of happiness.",
  "// return love; // always ❤️",
];

const TypingMessage = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || currentLine >= lines.length) return;

    const line = lines[currentLine];
    if (currentChar <= line.length) {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => {
          const copy = [...prev];
          copy[currentLine] = line.slice(0, currentChar);
          return copy;
        });
        setCurrentChar((c) => c + 1);
      }, line === "" ? 100 : 35);
      return () => clearTimeout(t);
    } else {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }
  }, [started, currentLine, currentChar]);

  return (
    <section ref={ref} className="py-20 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full rounded-2xl bg-card border border-border overflow-hidden box-glow-accent">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          <span className="w-3 h-3 rounded-full bg-destructive/70" />
          <span className="w-3 h-3 rounded-full bg-accent/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-muted-foreground font-mono-code">love.ts</span>
        </div>

        {/* Code content */}
        <div className="p-6 font-mono-code text-sm md:text-base leading-relaxed min-h-[320px]">
          {displayedLines.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-muted-foreground/40 w-8 text-right mr-4 select-none text-xs">
                {i + 1}
              </span>
              <span
                className={`${
                  line.startsWith("//") ? "text-muted-foreground" : line.startsWith(">") ? "text-primary" : "text-foreground"
                }`}
              >
                {line}
                {i === currentLine && currentLine < lines.length && (
                  <span className="typing-cursor" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TypingMessage;
