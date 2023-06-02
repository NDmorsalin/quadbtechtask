import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const links = (
    <>
      <Link 
        to="/"
        className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
      >
        Home
      </Link>
      <Link 
        to="/allmovies"
        className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
      >
        All Movies
      </Link>
      <Link 
        to="/booked"
        className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
      >
        Booked Movies
      </Link>
      
    </>
  );

  return (
    <>
      <nav className="bg-gray-900 sticky top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex bg-gray-900 relative top-0 left-0 z-10 items-center justify-between h-16">
            <Link to={'/'} className="flex-shrink-0 text-gray-300 text-2xl font-bold">MovieStand</Link>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">{links}</div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`absolute -top-[400px] -z-10 left-0 bg-gray-900 w-full transform transition-all duration-300  ${isMenuOpen ? "!top-16" : ""} md:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">{links}</div>
        </div>
      </nav>
    </>
  );
};

export default Header;
