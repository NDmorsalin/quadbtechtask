import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("https://api.tvmaze.com/search/shows?q=all");
      const data = await res.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      {movies.map((movie) => (
        <div key={movie?.show?.id} className="relative group">
          <div className="absolute top-2 left-2 py-1 px-4 rounded-md text-white bg-cyan-700 z-20">
            {movie?.show?.language}
          </div>
          {movie?.show?.rating?.average && (
            <div className="absolute top-2 right-2 py-1 px-4  rounded-md text-white bg-gray-900 z-20 flex items-center gap-2">
              <FaStar /> {movie?.show?.rating?.average}
            </div>
          )}
          <div className="absolute z-10 top-1/2 w-full h-full  left-1/2 -translate-x-1/2  -translate-y-1/2 flex items-center justify-center gap-4 flex-col ">
            <Link
              to={`/details/${movie?.show?.id}`}
              className=" py-1 px-4 rounded-md text-white bg-slate-900/60 border border-yellow-500/75 z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100 font-bold "
            >
              view details
            </Link>
            <Link
              to={`/theatre/${movie?.show?.id}`}
              className=" py-1 px-4 rounded-md text-white bg-cyan-700/80 border border-yellow-500/75 z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500 transform scale-150 group-hover:scale-100 font-bold "
            >
              Booking Seats
            </Link>
          </div>

          <div
            className={`rounded-xl relative h-96 overflow-hidden border-2 border-orange-400 border-transparent transition-all duration-300`}
          >
            <img
              src={movie?.show?.image?.medium}
              alt={movie?.show?.name}
              className="w-full h-full object-cover absolute"
            />
            <div className="absolute w-full h-full bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-4xl font-bold text-white absolute bottom-4 ml-4 ">
                {movie?.show?.name}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllMovies;
