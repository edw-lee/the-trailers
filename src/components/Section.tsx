import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import dayjs from "dayjs";
import { fjalla } from "@/lib/fonts";

type SectionProps = {};

function SectionThumbnail() {
  return (
    <div>
      <img
        className="rounded-xl mb-5"
        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTOWuk9UDhkMIZx7tu5SAm1anzf8L5R0SX0SnNKCvmx6eZZDww1"
      />
      <p className={cn(fjalla.className)}>Title</p>
      <div className="flex gap-3">
        <p>{dayjs(new Date()).format("MMM DD")}</p>
        <Badge variant={"outline"} className="border-yellow-200">
          Platform
        </Badge>
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className={cn("w-full max-w-screen flex justify-center", "my-20")}>
      <div className="container">
        <p className="text-lg font-bold mb-5">Header</p>
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/5">
                <SectionThumbnail />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
