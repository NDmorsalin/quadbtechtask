import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { A11y, FreeMode, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useRef, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// install Swiper modules
// SwiperCore.use([Navigation]);

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState();
  const swiper = useRef(null);
  const handleNextSlideClick = () => {
    // call swiper instance's slideNext() method
    swiper.current.swiper.slideNext();
  };
  const handlePrevSlideClick = () => {
    // call swiper instance's slidePrev() method
    // console.dir(swiper.current);
    swiper.current.swiper.slidePrev();
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("https://api.tvmaze.com/search/shows?q=all");
      const data = await res.json();
      setMovies(data);
      setCurrentMovie(data[0]);
    };
    fetchMovies();
  }, []);

  return (
    <div
      className={`absolute  top-0 left-0 w-full h-screen flex items-center justify-center -z-0 overflow-auto`}
    >
      {/* background image and overlay */}
      <div className="absolute w-full h-full left-0 top-0 z-0">
        <img
          src={currentMovie?.show?.image?.original}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute w-full h-full left-0 top-0 z-0 bg-black/75"></div>
      {/* background image and overlay */}

      <div className="md:ps-8 px-8 flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 relative z-10">
        <div className=" md:col-span-2 flex items-center">
          <div className="">
            <h1 className="text-6xl font-bold text-white">
              {currentMovie && currentMovie.placeName}
            </h1>
            <p className="text-white mt-4 font-light">
              {currentMovie &&
              currentMovie?.show?.summary.replace(/<[^>]*>/g, "").length > 150
                ? currentMovie?.show?.summary
                    .replace(/<[^>]*>/g, "")
                    .split("")
                    .slice(0, 200)
                    .join("") + " ..."
                : currentMovie?.show?.summary.replace(/<[^>]*>/g, "")}
            </p>
            <div className="">
              <Link
                to={`/details/${currentMovie?.show?.id}`}
                className=" w-full text-center  mt-4 px-4 py-2 bg-cyan-700/75 text-white rounded-lg hover:bg-cyan-600/75 font-bold transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                Details
                <FaArrowRight className="animate-pulse" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-col md:col-span-4 w-full">
          <div>
            <Swiper
              onInit={(swiper) => {
                setCurrentMovie(movies[swiper.realIndex]);
              }}
              onSlideChange={(swiper) => {
                setCurrentMovie(movies[swiper.realIndex]);
              }}
              ref={swiper}
              modules={[Pagination, FreeMode, A11y]}
              spaceBetween={10}
              slidesPerView={1}
              freeMode={true}
              loop={true}
              centeredSlides={false}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                996: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {movies.map((movie) => (
                <SwiperSlide
                  key={movie?.show?.id}
                  className="relative group"
                  tag="div"
                >
                  <div className="absolute top-2 left-2 py-1 px-4 rounded-md text-white bg-cyan-700 z-20">
                    {movie?.show?.language}
                  </div>
                  {movie?.show?.rating?.average && (
                    <div className="absolute top-2 right-2 py-1 px-4  rounded-md text-white bg-gray-900 z-20 flex items-center gap-2">
                      <FaStar /> {movie?.show?.rating?.average}
                    </div>
                  )}
                  <Link
                    to={movie?.show?.url}
                    className="absolute top-1/2  left-1/2 -translate-x-1/2  -translate-y-1/2 py-1 px-4 rounded-md text-white bg-slate-900/60 border border-yellow-500/75 z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100 font-bold "
                  >
                    Official Site
                  </Link>
                  <div
                    className={`rounded-xl relative h-48 md:h-80 overflow-hidden border-2 ${
                      movie?.show?.id === currentMovie?.show?.id
                        ? "border-orange-400"
                        : "border-transparent"
                    } transition-all duration-300`}
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex items-center gap-4 mx-auto md:mx-0 mb-4 md:mt-4">
            <button
              className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-black hover:text-white hover:bg-orange-400 transition-all duration-300"
              onClick={handlePrevSlideClick}
            >
              <FaAngleLeft />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-black hover:text-white hover:bg-orange-400 transition-all duration-300"
              onClick={handleNextSlideClick}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
