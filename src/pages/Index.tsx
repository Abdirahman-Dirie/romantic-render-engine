import { useState } from "react";
import IntroScreen from "@/components/IntroScreen";
import BirthdayTitle from "@/components/BirthdayTitle";
import PhotoGallery from "@/components/PhotoGallery";
import TypingMessage from "@/components/TypingMessage";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";

const Index = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen gradient-romantic relative">
      {!started && <IntroScreen onOpen={() => setStarted(true)} />}

      {started && (
        <>
          <FloatingHearts />
          <MusicPlayer />
          <main className="relative z-10">
            <BirthdayTitle />
            <PhotoGallery />
            <TypingMessage />
            <Footer />
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
