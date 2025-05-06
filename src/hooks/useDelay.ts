import { useRef } from "react";

export function useDelay(delay: number) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startDelay = () => {
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
    }, delay);
  };

  return { startDelay, canRun: timerRef.current == null };
}
