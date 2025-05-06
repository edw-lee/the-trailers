"use client";

import { useEffect, useState } from "react";

export default function useIsTabActive() {
  const [isActive, setIsActive] = useState(true);

  const visibilityChangeHandler = (e: Event) => {
    if (document.visibilityState == "visible") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, []);

  return isActive;
}
