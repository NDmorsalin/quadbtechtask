import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { A11y, FreeMode, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// install Swiper modules
// SwiperCore.use([Navigation]);

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [currentPlaces, setCurrentPlaces] = useState();
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
    const fetchPlaces = async () => {
      const res = await fetch("http://localhost:3000/places");
      const data = await res.json();
      setPlaces(data);
      setCurrentPlaces(data[0]);
    };
    fetchPlaces();
  }, []);
  console.log(currentPlaces);
  return (
    <div
      className={`absolute  top-0 left-0 w-full h-screen flex items-center justify-center -z-0`}
    >
      {/* background image and overlay */}
      <div className="absolute w-full h-full left-0 top-0 z-0">
        <img
          src={currentPlaces?.thumbImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute w-full h-full left-0 top-0 z-0 bg-black/70"></div>
      {/* background image and overlay */}

      <div className="ps-8 flex-1 grid md:grid-cols-6 gap-4 relative z-10">
        <div className="col-span-2 flex items-center">
          <div className="">
            <h1 className="text-6xl font-bold text-white">
              {currentPlaces && currentPlaces.placeName}
            </h1>
            <p className="text-white mt-4 font-light">
              {currentPlaces && currentPlaces.aboutThisPlace}
            </p>
            <div className="">
              <Link
                to={`/place/${currentPlaces?.id}`}
                className=" mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all duration-300 inline-flex items-center gap-3"
              >
                Booking
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div>
            <Swiper
              onInit={(swiper) => {
                setCurrentPlaces(places[swiper.realIndex]);
              }}
              onSlideChange={(swiper) => {
                setCurrentPlaces(places[swiper.realIndex]);
              }}
              ref={swiper}
              modules={[Pagination, FreeMode, A11y]}
              spaceBetween={10}
              slidesPerView={3}
              freeMode={true}
              loop={true}
              centeredSlides={false}
              pagination={{
                clickable: true,
              }}
            >
              {places.map((place) => (
                <SwiperSlide key={place.id} className="" tag="div">
                  <div className=" rounded-xl relative h-96 overflow-hidden border-2 border-transparent hover:border-orange-400 transition-all duration-300">
                    <img
                      src={place.thumbImage}
                      alt={place.name}
                      className="w-full h-full object-cover absolute"
                    />
                    <div className="absolute w-full h-full bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-4xl font-bold text-white absolute bottom-4 ml-4 ">
                        {place.placeName}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex items-center gap-4 mt-4">
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
