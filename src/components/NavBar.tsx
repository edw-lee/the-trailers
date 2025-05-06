"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        "flex justify-center fixed w-screen z-10 drop-shadow-md bg-transparent px-3",
        "transition-colors ease-in-out duration-300",
        isScrolled && "bg-linear-to-b from-background to-background/0 to-95%"
      )}
    >
      <div
        className={"container flex flex-row justify-between items-center py-3"}
      >
        <Link href="/">
          <Logo />
        </Link>
        <SearchBar />
      </div>
    </nav>
  );
}
