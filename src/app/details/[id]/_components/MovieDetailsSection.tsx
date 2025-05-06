import { fjalla } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type MovieDetailsSectionProps = {
  header: string;
  children: React.ReactNode;
  className?: string;
};

export default function MovieDetailsSection({
  header,
  children,
  className,
}: MovieDetailsSectionProps) {
  return (
    <div className={cn("flex flex-col gap-5 px-2 sm:px-0 justify-start", className)}>
      <p className={cn("uppercase opacity-50", fjalla.className)}>{header}</p>
      {children}
    </div>
  );
}
