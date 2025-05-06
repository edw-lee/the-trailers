"use client";

import { cn } from "@/lib/utils";
import { ImgHTMLAttributes, useEffect, useState } from "react";

type ProgressiveImageProps = {
  placeholder?: string;
  delay?: number;
  containerClassName?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function ProgressiveImage({
  placeholder,
  delay,
  containerClassName,
  ...props
}: ProgressiveImageProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShouldLoad(true);
    }, delay);
  }, []);

  return (
    <div className={containerClassName}>
      {placeholder && !isLoaded && <img {...props} src={placeholder} />}
      {shouldLoad && (
        <img
          {...props}
          className={cn(
            "opacity-0",
            { "opacity-100": isLoaded },
            props.className
          )}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
