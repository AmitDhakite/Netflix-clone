import React, {useState, useEffect} from 'react';
import axios from './axios.js';
// import Poster from './Poster.js';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}){
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // useEffect used for rendering data whenever [], means rendering when loading of page , and [fetchUrl] means that everytime new url comes then it is refreshed
  useEffect( () => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    const handleClick = (movie)=>{
      if(trailerUrl){
        setTrailerUrl('');
      } else {
        movieTrailer(movie?.name || "")
          .then((url) => {
              //https://developers.google.com/youtube/player_parameters
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get('v'));
          })
          .catch((error) => console.log(error));
      }
    };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/*}<Poster add={movies} isLargeRow={isLargeRow}/> */}
        {movies.map((movie) => <img key={movie.id} onClick={()=>handleClick(movie)} className= {`row_poster ${isLargeRow && "row_posterLarge"}`} src={isLargeRow ? (base_url+movie.poster_path):(base_url+movie.backdrop_path)} alt={movie.name} />)}
      </div>
      {trailerUrl && <Youtube className="youtube" videoId={trailerUrl} opt={opts} />}
    </div>
  );
}

export default Row;
