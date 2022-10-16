import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/Home.module.css';
import MovieList from './MovieList';
import MovieListHeading from './MovieHeading';
import SearchBox from './SearchBox';
import AddtoWatchlist from './AddtoWatchlist';
import RemoveFromWatchlist from './RemoveFromWatchlist';
import MovieContent from './MovieContent';

const SideMenu = () => {
  const [movies, setMovies] = useState([]);
  const [result, setResult] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
      setResult(responseJson);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <>
      <div className={styles.header}>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <MovieListHeading heading='Movies' />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.sideBar}>
          <div className='row'>
            <p>RESULTS: {result.totalResults}</p>
            <MovieList
              movies={movies}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={AddtoWatchlist}
            />
          </div>
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favourites' />
          </div>
          <div className='row'>
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFromWatchlist}
            />
          </div>
        </div>
        <MovieContent />
      </div>
    </>
  );
};

export default SideMenu;
