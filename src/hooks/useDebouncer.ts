import { useRef } from "react";

export function useDebouncer(delay: number) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = (callback: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(callback, delay);
  };

  return debounce;
}
