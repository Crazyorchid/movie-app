import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css';
import MovieList from './MovieList';
import MovieListHeading from './MovieHeading';
import SearchBox from './SearchBox';
import AddtoWatchlist from './AddtoWatchlist';
import MovieContent from './MovieContent';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [result, setResult] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}`;
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
          <div className='row' style={{ overflowY: 'scroll', height: '100%' }}>
            <p>RESULTS: {result.totalResults}</p>
            <MovieList
              movies={movies}
              setSelectedMovie={setSelectedMovie}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={AddtoWatchlist}
            />
          </div>
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favourites' />
          </div>
          {/* <div className='row'>
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFromWatchlist}
            />
          </div> */}
        </div>
        <div className={styles.mainContent}>
          {selectedMovie && <MovieContent movieId={selectedMovie} />}
        </div>
      </div>
    </>
  );
};

export default Home;
