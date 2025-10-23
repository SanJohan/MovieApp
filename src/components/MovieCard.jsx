import '../css/MovieCard.css'
import { useMovieContext } from '../hooks/useMovies.jsx';
import { useNavigate } from 'react-router-dom';

function MovieCard({movie}){

  const navigate = useNavigate();

  const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();
  const favorite = isFavorite(movie.id);
  function onFavoriteClick(e){
    e.preventDefault();
    e.stopPropagation(); 
    if(favorite) removeFromFavorites(movie.id)
    else addToFavorites(movie)
  }

  const handleMovieCardClick = () => {
    navigate(`/movie/${movie.id}`);
  }

    return (
      <>
          <div className="movie-card" onClick={handleMovieCardClick}>
              <div className="movie-poster">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster of ${movie.title}`} />
                  <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={onFavoriteClick}>❤︎</button>
                  </div>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split('-')[0]}</p>
              </div>
          </div>
      </>
    )
}

export default MovieCard;