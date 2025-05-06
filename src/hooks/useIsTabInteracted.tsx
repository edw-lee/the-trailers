"use client";

import { useEffect, useState } from "react";

export default function useIsTabInteracted() {
  const [userInteracted, setUserInteracted] = useState(false);

  const interactionHandler = (e: Event) => {
    setUserInteracted(true);    
  };

  useEffect(() => {
    document.addEventListener("click", interactionHandler, true);

    return () => {
      document.removeEventListener("click", interactionHandler);
    };
  }, []);

  return userInteracted;
}
