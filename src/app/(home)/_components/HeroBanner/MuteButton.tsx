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
    <button onClick={onClick} className="drop-shadow cursor-pointer">
      {isMuted ? (
        <VolumeX fill="white" size={30} />
      ) : (
        <Volume2 fill="white" size={30} />
      )}
    </button>
  );
}
