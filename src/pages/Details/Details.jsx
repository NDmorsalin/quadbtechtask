import { Link, useLoaderData } from "react-router-dom";

// install Swiper modules
// SwiperCore.use([Navigation]);

const Details = () => {
  const movie = useLoaderData();

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 container px-8 mx-auto my-8">
        <div className="">
          <img src={movie?.show?.image?.medium} alt="" className="w-full" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{movie?.show?.name}</h1>
          <p className="text-lg">
            {movie?.show?.summary.replace(/<[^>]*>/g, "")}
          </p>
          <div className="">
            <h2 className="text-2xl font-semibold">Movie Features</h2>
            <div className="">
              <p className="">
                <span className="font-semibold">Language:</span>{" "}
                {movie?.show?.language}
              </p>
              <p className="">
                <span className="font-semibold">Genres:</span>{" "}
                {movie?.show?.genres.join(", ")}
              </p>
              <p className="">
                <span className="font-semibold">Runtime:</span>{" "}
                {movie?.show?.runtime} minutes
              </p>
              <p className="">
                <span className="font-semibold">Premiered:</span>{" "}
                {movie?.show?.premiered}
              </p>
              <p className="">
                <span className="font-semibold">Rating:</span>{" "}
                {movie?.show?.rating?.average}
              </p>

              <p className="">
                <span className="font-semibold">Status:</span>{" "}
                {movie?.show?.status}
              </p>

              <p className="">
                <span className="font-semibold">Official Site:</span>{" "}
                <Link
                  to={movie?.show?.officialSite}
                  target="_blank"
                  className="text-blue-500"
                >
                  {movie?.show?.officialSite}
                </Link>
              </p>

              <p className="">
                <span className="font-semibold">Schedule:</span>{" "}
                {movie?.show?.schedule?.days.join(", ")} at{" "}
                {movie?.show?.schedule?.time}
              </p>

              <p className="">
                <span className="font-semibold">Network:</span>{" "}
                {movie?.show?.network?.name}
              </p>

              <p className="">
                <span className="font-semibold">Country:</span>{" "}
                {movie?.show?.network?.country?.name}
              </p>

              <p className="">
                <span className="font-semibold">Timezone:</span>{" "}
                {movie?.show?.network?.country?.timezone}
              </p>

              <p className="">
                <span className="font-semibold">Type:</span> {movie?.show?.type}
              </p>

              <p className="">
                <span className="font-semibold">Updated:</span>{" "}
                {movie?.show?.updated}
              </p>
            </div>
            <div className="my-7">
              <Link
                to={`/theatre/${movie?.show?.id}`}
                className="py-2 px-4 rounded-md mt-4 bg-blue-500 text-white font-bold"
              >
                Booking Seats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
