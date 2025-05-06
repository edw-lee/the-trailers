import { cn } from "@/lib/utils";

type SpinnerProps = {
  value: number;
  background?: string;
  fill?: string;
  className?: string;
  children?: React.ReactNode;
};

function CircularProgress({
  value,
  background = "white",
  fill = "blue",
  className,
  children,
}: SpinnerProps) {
  return (
    <div className={cn("aspect-square", className)}>
      <svg className="transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke={background}
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke={fill}
          strokeWidth="8"
          strokeDasharray="251.2"
          strokeDashoffset={251.2 * (1 - value)}
        />
      </svg>
      {children}
    </div>
  );
}

export { CircularProgress };
