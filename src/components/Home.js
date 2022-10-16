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

  const getMovieRequest = async (searchValue, page) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}`;
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
  const handleScrollEvent = (e) => {
    let endList =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    if (endList) {
      let newPage = page + 1;
      setPage(newPage);
      getMovieRequest(searchValue);
      console.log(newPage);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.sideBar}>
          <div
            className={styles.sideBarScroll}
            style={{ overflowY: 'scroll', height: '100%' }}
            onScroll={handleScrollEvent}>
            <br />
            <span style={{ padding: '30px' }}>
              {result.totalResults} RESULTS
            </span>
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
