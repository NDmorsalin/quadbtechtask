import { FaEye, FaStar } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

const Booked = () => {
  const savedMovies = useLoaderData();
  const localStoredSavedMoviesSeats = JSON.parse(localStorage.getItem("seats"));
  const moviesWithSeats = savedMovies.map((movie) => {
    const movieWithSeats = localStoredSavedMoviesSeats.find(
        (seat) => seat.movieId === movie?.show?.id
        );
        if (movieWithSeats) {
            return {
                ...movie,
                selectedSeats: movieWithSeats.selectedSeats,
            };
        }
        return movie;
    });
    // console.log(moviesWithSeats);
    
  return (
    <>
    {
      moviesWithSeats.filter((mWs)=>mWs?.selectedSeats.length>0).length >0 ? (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Movie Image
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Movie Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheduled Date
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number of Seats
              </th>
              <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                View Bookings
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {moviesWithSeats.filter((mWs)=>mWs?.selectedSeats.length>0).map((movie, index) => (
              <tr key={index}>
                
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        <img
                          src={movie?.show?.image?.medium}
                          alt=""
                          className=" min-w-[5rem] h-20 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {movie?.show?.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center">
                    {movie?.show?.rating?.average && (
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center justify-center gap-2">
                          <FaStar /> {movie?.show?.rating?.average}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center">
                    {movie?.show?.schedule?.time && (
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {movie?.show?.schedule?.days[0]} at{" "}
                          {movie?.show?.schedule?.time}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center">
                  
                    {movie?.selectedSeats.length>0 && (
                      <div className="ml-4">
                        {
                           movie?.selectedSeats.join(", ")
                        }
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <Link to={`/theatre/${movie?.show?.id}`} className="flex items-center justify-center">
                    <FaEye className="text-gray-500 cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>)
      :(
        <div className="flex items-center justify-center h-screen">
          <h3 className="text-4xl text-center">Your booking is Empty <Link to='/allmovies' className="py-2 px-4 rounded bg-cyan-600 text-white"> View All movies</Link></h3>
        </div>

      )
    }
    </>
  );
};

export default Booked;
