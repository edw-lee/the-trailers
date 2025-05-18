"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsMuted } from "@/store/slices/homeSlice";
import { Volume2, VolumeX } from "lucide-react";

export default function MuteButton() {
  const { isMuted } = useAppSelector(({ home }) => home);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(setIsMuted(!isMuted));
  };

  return (
    <button 
      onClick={onClick} 
      className="drop-shadow cursor-pointer" 
      data-testid="mute-button"
      aria-label={isMuted ? "Unmute" : "Mute"}
      type="button"
    >
      {isMuted ? (
        <VolumeX data-testid="volume-icon" fill="white" className="lucide-volume-x" />
      ) : (
        <Volume2 data-testid="volume-icon" fill="white" className="lucide-volume-2" />
      )}
    </button>
  );
}
