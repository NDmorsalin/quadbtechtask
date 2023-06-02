


const fetchBookedMovies = async () => {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=all");
    const data = await res.json();
    
    const localStoredSavedMoviesSeats = JSON.parse(localStorage.getItem("seats"));
    let savedMovies = [];
    if(localStoredSavedMoviesSeats){
        savedMovies = data.filter((movie) => {
            return localStoredSavedMoviesSeats.find((el) => el?.movieId === parseInt(movie?.show?.id))
        });
    }
    
    return savedMovies
};

export default fetchBookedMovies;