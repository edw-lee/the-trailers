"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { Progress } from "../ui/progress";

type ThumbnailProps = {
  isSelected?: boolean;
  progress?: number;
  onClick?: () => void;
};

export default function Thumbnail({
  isSelected,
  progress,
  onClick,
}: ThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-video rounded-2xl overflow-hidden",
        "p-0 relative cursor-pointer",
        "border border-4 border-transparent",
        "group hover:border-white",
        isSelected && "border-white"
      )}
    >
      <img
        className="object-cover"
        src={"https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"}
      />
      <span
        className={cn(
          "absolute bg-lime-500 px-5 py-3 rounded-lg",
          "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-opacity",
          "group-hover:opacity-100",
          !isSelected ? "opacity-0" : "opacity-100"
        )}
      >
        <Play fill="white" />
      </span>
      <Progress
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[8px]",
          !isSelected ? "opacity-0" : "opacity-100"
        )}
        value={progress}
      />
    </button>
  );
}
