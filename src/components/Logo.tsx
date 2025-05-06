import { fjalla } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function Logo() {
  return (
    <div className={cn(fjalla.className, "text-foreground drop-shadow-md")}>
      <p className="text-[10px] md:text-xs">The</p>
      <p className="text-lg md:text-xl">TRAILERS</p>
    </div>
  );
}
