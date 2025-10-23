import { useState, useEffect } from 'react';
import { MovieContext } from '../hooks/useMovies';



export const MovieProvider = ({children}) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem('favorites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Saved favorites to localStorage:', favorites);
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites(prev => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const value = { favorites, addToFavorites, removeFromFavorites, isFavorite };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

