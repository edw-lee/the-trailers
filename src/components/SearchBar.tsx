"use client";

import { SearchMovieDto } from "@/dtos/trailers/SearchMovieDto";
import { useSearchMovies } from "@/hooks/data/trailers/useSearchMovies";
import { cn } from "@/lib/utils";
import { DeleteIcon, SearchIcon, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { useDebouncer } from "@/hooks/useDebouncer";

type ResultItemProps = {
  movie: SearchMovieDto;
};

type SearchIconWrapperProps = {
  isLoading?: boolean;
  hasText?: boolean;
  onClearClick?: () => void;
};

function ResultItem({ movie }: ResultItemProps) {
  return (
    <a
      className={cn(
        "cursor-pointer block select-none space-y-1 rounded-md p-3",
        "leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      )}
      href={`/details/${movie.id}`}
    >
      <div className="flex flex-row gap-3 items-center">
        <img
          className="rounded aspect-2/3 bg-white/50"
          src={movie.thumbnailUrl}
          width={30}
        />
        <p>{movie.title}</p>
      </div>
    </a>
  );
}

function SearchIconWrapper({
  isLoading,
  hasText,
  onClearClick,
}: SearchIconWrapperProps) {
  if (isLoading) {
    return <Spinner className="w-4 h-4" fill="oklch(76.8% 0.233 130.85)" />;
  }

  if (hasText) {
    return <X className="cursor-pointer" size={18} onClick={onClearClick} />;
  }

  return <SearchIcon size={18} />;
}

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const { data: movies, isLoading } = useSearchMovies(query);
  const debouncer = useDebouncer(350);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debouncer(() => setQuery(e.target.value));
  };

  const onClear = () => {
    setInput("");
    setQuery("");
  };

  const onBlur = () => {
    debouncer(() => setQuery(""));
  };

  return (
    <div className="relative w-[300px]">
      <div className="relative w-full flex items-center">
        <Input
          className="bg-black/40 border-none placeholder:text-foreground"
          placeholder="Search for a movie"
          onChange={onChange}
          onBlur={onBlur}
          value={input}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          <SearchIconWrapper
            isLoading={isLoading}
            hasText={Boolean(input)}
            onClearClick={onClear}
          />
        </span>
      </div>
      <div
        className={cn(
          "absolute",
          "bg-background rounded-md my-1 rounded-scrollbar",
          "max-h-[500px] overflow-y-auto opacity-0 transition-opacity delay-150 duration-350",
          movies?.length && "opacity-100 p-2 border"
        )}
      >
        {movies?.map((movie, index) => (
          <ResultItem key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}
