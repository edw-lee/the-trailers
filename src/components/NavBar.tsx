"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const onScrolledHandler = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrolledHandler);

    return () => {
      window.removeEventListener("scroll", onScrolledHandler);
    };
  }, []);

  return (
    <nav
      className={cn(
        "flex justify-center fixed w-screen z-10 drop-shadow-md bg-transparent",
        "transition-colors ease-in-out duration-300",
        isScrolled && "bg-background/75 backdrop-blur"
      )}
    >
      <div
        className={"container flex flex-row justify-between items-center py-3"}
      >
        <a href="/">
          <Logo />
        </a>
        <SearchBar />
      </div>
    </nav>
  );
}
