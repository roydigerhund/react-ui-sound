import React, { useEffect, useRef } from "react";

interface SoundPlayerProps {
  soundSrc: string;
  children: React.ReactNode;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ soundSrc, children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a new audio element or update the source of the existing one
    if (audioRef.current) {
      audioRef.current.src = soundSrc;
    } else {
      audioRef.current = new Audio(soundSrc);
    }

    const audioElement = audioRef.current;

    const handleAudioError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      console.error("Error playing sound:", {
        code: target.error?.code,
        message: target.error?.message,
      });
    };

    audioElement.addEventListener("error", handleAudioError);

    return () => {
      audioElement.removeEventListener("error", handleAudioError);
    };
  }, [soundSrc]);

  const playSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };

  return <button onClick={playSound}>{children}</button>;
};

export default SoundPlayer;
