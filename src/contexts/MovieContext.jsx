//state manager for our fav movies

import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //add to fav
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]); //take all the previous value and then add the new movie (done to update state)
  };

  //rem from fav
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  //provide value to childern
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}; //this provider will provide state of any of the componenets that are wrapped inside it
