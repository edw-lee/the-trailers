import { SearchIcon } from "lucide-react";
import Logo from "./Logo";
import { Input } from "./ui/input";

function Searchbar() {
  return (
    <div className="relative w-[300px] flex items-center">
      <Input
        className="bg-black/40 border-none placeholder:text-foreground"
        placeholder="Search for a movie"
      />
      <SearchIcon
        className="absolute right-3 top-1/2 -translate-y-1/2"
        size={18}
      />
    </div>
  );
}

export default function NavBar() {
  return (
    <nav className="flex justify-center fixed w-screen z-10">
      <div className={"container flex flex-row justify-between py-5"}>
        <a href="/">
          <Logo />
        </a>
        <Searchbar />
      </div>
    </nav>
  );
}
