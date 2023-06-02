import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Theatre = () => {
  // Array to store the seat status (e.g., booked, available, selected)
  const [seats, setSeats] = useState(Array(120).fill("available"));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const movie = useLoaderData();

  // Function to handle seat click event
  const handleSeatClick = (index) => {
    // Toggle the seat status between 'available' and 'selected'
    const updatedSeats = [...seats];
    updatedSeats[index] =
      seats[index] === "available" ? "selected" : "available";
    setSeats(updatedSeats);

    const seatsFromLocalStorage = JSON.parse(localStorage.getItem("seats"));

    if (seatsFromLocalStorage) {
      
      const previousSelectedMovie = seatsFromLocalStorage.find(
        (seat) => seat.movieId === movie?.show?.id
      );
console.log('after first click');
      if (previousSelectedMovie) {
        
        const stordMovieExceptCurrent = seatsFromLocalStorage.filter(
          (seat) => seat.movieId !== movie?.show?.id
        );

        if (selectedSeats.includes(index + 1)) {
          setSelectedSeats((prev) => {
            localStorage.setItem(
              "seats",
              JSON.stringify([...stordMovieExceptCurrent,
                {
                  movieId: movie?.show?.id,
                  selectedSeats: prev.filter((seat) => seat !== index + 1),
                },
              ])
            );

            return prev.filter((seat) => seat !== index + 1);
          });
          return;
        }
        setSelectedSeats((prev) => {
          localStorage.setItem(
            "seats",
            JSON.stringify([...stordMovieExceptCurrent,
              {
                movieId: movie?.show?.id,
                selectedSeats: [...prev, index + 1],
              },
            ])
          );
          return [...prev, index + 1];
        });
        
      } 
      else {
        if (selectedSeats.includes(index + 1)) {
          setSelectedSeats((prev) => {
            localStorage.setItem(
              "seats",
              JSON.stringify([
                ...seatsFromLocalStorage,
                {
                  movieId: movie?.show?.id,
                  selectedSeats: prev.filter((seat) => seat !== index + 1),
                },
              ])
            );
            return prev.filter((seat) => seat !== index + 1);
          });
          return;
        }

        setSelectedSeats((prev) => {
          localStorage.setItem(
            "seats",
            JSON.stringify([
              ...seatsFromLocalStorage,
              {
                movieId: movie?.show?.id,
                selectedSeats: [...prev, index + 1],
              },
            ])
          );
          return [...prev, index + 1];
        });
      }
    } else {
console.log('first click')
      setSelectedSeats((prev) => {
        localStorage.setItem(
          "seats",
          JSON.stringify([
            {
              movieId: movie?.show?.id,
              selectedSeats: [...prev, index + 1],
            },
          ])
        );
        return [...prev, index + 1];
      });
    }
  };
console.log(selectedSeats);
  useEffect(() => {
    const seatsFromLocalStorage = JSON.parse(localStorage.getItem("seats"));

    if (seatsFromLocalStorage) {
      const selectedSeatsFromLocalStorage = seatsFromLocalStorage.find(
        (seat) => seat.movieId === movie?.show?.id
      );

      if (selectedSeatsFromLocalStorage) {
        setSelectedSeats((prev) => {
          const updatedSeats = [...seats];
          selectedSeatsFromLocalStorage.selectedSeats.forEach((seat) => {
            updatedSeats[seat - 1] = "selected";
          });
          setSeats(updatedSeats);

          return selectedSeatsFromLocalStorage.selectedSeats;
        });
      }
    }
  }, [movie?.show?.id]);

  return (
    <>
      <div className="container mx-auto px-8">
        <div className="">
          <div className="bg-gray-800 max-w-lg mx-auto rounded-lg mb-8">
            <div className="h-2 bg-gray-900"></div>
            <div className="flex h-[260px] flex-wrap justify-between p-4 overflow-hidden ">
              <img
                src={movie?.show?.image?.original}
                alt=""
                className="w-full rounded"
              />
            </div>
            <div className="h-2  bg-gray-900 mt-2"></div>
            <div className="flex justify-between p-2">
              <div className="bg-gray-700 w-8 h-8 rounded-md"></div>
              <div className="bg-gray-700 w-8 h-8 rounded-md"></div>
              <div className="bg-gray-700 w-8 h-8 rounded-md"></div>
            </div>
          </div>
        </div>
        <div className=" flex items-center max-w-4xl mx-auto justify-between gap-2 flex-wrap">
          {seats.map((seatStatus, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg cursor-pointer w-7 h-7 flex items-center justify-center  ${
                seatStatus === "available" ? "bg-gray-500" : "bg-green-500"
              }`}
              onClick={() => handleSeatClick(index)}
            >
              <span className="text-white text-sm">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Theatre;
