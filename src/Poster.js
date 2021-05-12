import './Row.css';
const base_url = "https://image.tmdb.org/t/p/original/";


function Poster({add, isLargeRow}){
    return add.map((movie) => <img key={movie.id} className= {`row_poster ${isLargeRow && "row_posterLarge"}`} src={isLargeRow ? (base_url+movie.poster_path):(base_url+movie.backdrop_path)} alt={movie.name} />);
}

export default Poster;
