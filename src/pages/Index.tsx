import { useState } from "react";
import IntroScreen from "@/components/IntroScreen";
import CinematicFlow from "@/components/CinematicFlow";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="h-screen overflow-hidden gradient-romantic relative">
      {!started && <IntroScreen onOpen={() => setStarted(true)} />}

      {started && (
        <>
          <FloatingHearts />
          <MusicPlayer />
          <CinematicFlow />
        </>
      )}
    </div>
  );
};

export default Index;
