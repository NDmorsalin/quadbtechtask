import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <div className="container px-8 mx-auto py-2 flex items-center justify-between relative z-50">
      <Link to="/" className="w-28 block">
        <img src={logo} alt="" className="w-full" />
      </Link>
      <div className="flex items-center gap-2 rounded bg-white/10  px-3 backdrop-blur-sm border ">
        <button type="button" className="">
          <FaSearch className="text-white" />
        </button>
        <input
          className="p-2 bg-transparent focus:outline-none"
          type="search"
          name="search"
          id="search"
          placeholder="search your destination"
        />
      </div>
      <div className="flex items-center gap-4">
        <Link to="/news" className="text-white">
          News
        </Link>

        <Link to="/destination" className="text-white">
          Destination
        </Link>
        <Link to="/blog" className="text-white">
          Blog
        </Link>
        <Link to="/contact" className="text-white">
          Contact
        </Link>
        <Link to="/login" className="text-white">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
