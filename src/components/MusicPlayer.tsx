import { useState, useRef, useEffect } from "react";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a royalty-free romantic piano piece from a CDN
    const audio = new Audio(
      "https://cdn.pixabay.com/audio/2024/11/29/audio_d27ac628b0.mp3"
    );
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary/20 border border-primary/30
        flex items-center justify-center backdrop-blur-sm transition-all duration-300
        hover:bg-primary/30 hover:scale-110 box-glow"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <span className="text-lg">{playing ? "⏸" : "🎵"}</span>
    </button>
  );
};

export default MusicPlayer;
