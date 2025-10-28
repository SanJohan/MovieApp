import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovie, getMovieCredits } from '../services/api.js';
import { useMovieContext } from '../hooks/useMovies.jsx';
import '../css/MovieDetails.css';


function MovieDetails() {

  const movieId = useParams().id;
  const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();


  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(null);

  const onClickFavorites = () => {
    if(isFavorite(movie.id)) removeFromFavorites(movie.id)
    else addToFavorites(movie)
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovie(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);    
      } finally {
        setLoading(false);
      }
    };

    const fetchMoviedCredits = async () => {
      try{
        const creditsData = await getMovieCredits(movieId);
        const cast = creditsData.cast.slice(0, 5);
        const crew = creditsData.crew.slice(0, 5);

        const castAndCrew = [...cast, ...crew];

        setCredits(castAndCrew);
      }catch(error){
        console.error("Error fetching movie credits:", error);
      }
    }

    fetchMovieDetails();
    fetchMoviedCredits();

  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <>
      <header className="movie-header-details">
        <div className ="movie-poster-details">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster of ${movie.title}`} />
          <div className="movie-description">
            <div>
              <h1 >{movie.title}</h1>
              <p>{movie.release_date} | {movie.runtime} minutes | {movie.genres.map(genre => genre.name).join('/')}</p>
            </div>
            <section>
              <h3>Synopsis</h3>
              <p>{movie.overview}</p>
            </section>
            <section>
              <h3>Rates and Reviews</h3>
              <p>Average Vote: {movie.vote_average} ({movie.vote_count} votes)</p>
              <p>Popularity: {movie.popularity}</p>
            </section>
            <div>
              <button onClick={onClickFavorites}>{isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
            </div>
          </div>
        </div>
      </header>

      
      <main>
        <section>
          <h3>Cast and Crew</h3>
          <ul>
            {credits && credits.map(member => (
              <li key={member.cast_id || member.credit_id}>
                {member.name} as {member.character || member.job}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )

}

export default MovieDetails;