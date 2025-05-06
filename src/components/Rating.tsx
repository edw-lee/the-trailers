import { interpolateColor } from "@/utils/colorUtil";
import { CircularProgress } from "./ui/circular-progress";
import { cn } from "@/lib/utils";

type RatingProps = {
  rating: number;
  className?: string;
};

export default function Rating({ className, rating }: RatingProps) {
  return (
    <CircularProgress
      className={cn("w-[40px] relative", className)}
      value={rating / 10}
      fill={interpolateColor(rating, 0, 10, "#ded81f", "#6fed2b")}
    >
      <p
        className={cn(
          "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
          "font-bold text-[10px]"
        )}
      >
        {Math.round(rating * 10)}
        <span className="text-[8px]">%</span>
      </p>
    </CircularProgress>
  );
}
