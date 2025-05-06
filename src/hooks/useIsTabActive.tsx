"use client";

import { useEffect, useState } from "react";

export default function useIsTabActive() {
  const [isActive, setIsActive] = useState(true);

  const visibilityChangeHandler = () => {
    setIsActive(document.visibilityState == "visible");
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, []);

  return isActive;
}
