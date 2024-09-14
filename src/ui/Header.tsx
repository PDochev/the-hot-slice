import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import logo_img from "/logo.png";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-primary px-4 py-3 uppercase sm:px-6">
      <Link
        to="/"
        className="tracking-widest text-xs md:text-sm flex items-center"
      >
        <span className="mr-2">
          <img src={logo_img} alt="The Hot Slice Co." className="h-8 w-8" />
        </span>
        The Hot Slice Co.
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
