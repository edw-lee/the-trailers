import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <nav className="flex justify-center fixed w-screen z-10">
      <div className={"container flex flex-row justify-between py-5"}>
        <a href="/">
          <Logo />
        </a>
        <SearchBar />
      </div>
    </nav>
  );
}
