
const fetchSinglePlace = async ({ params }) => {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=all");
    const data = await res.json();
const movie = data.find((el) => el?.show?.id === Number(params.id));
console.log(movie);
    return movie
}

export default fetchSinglePlace