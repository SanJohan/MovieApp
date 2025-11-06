import '../css/Favorites.css'
import { useMovieContext } from '../hooks/useMovies.jsx';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0){
    return (
      <>
        <div className="favorites">
          <h2>Your favorites</h2>
          <div className="movies-favorite-grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </>
    )
  }
  
  return ( 
    <>
      <div className="favorites-empty">
        <h1>No favorites movies yet</h1>
        <p>Start adding movies to your favorites and they will appear here</p>
      </div>
    </>
  )
}

export default Favorites;