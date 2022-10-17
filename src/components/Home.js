import React, { useState, useEffect, useCallback } from 'react';
import { useDebounceFn } from 'ahooks';
import styles from '../styles/Home.module.css';
import MovieList from './MovieList';
import SearchBox from './SearchBox';
import MovieContent from './MovieContent';
import RangeSlider from './RangeSlider';
import RadioGroup from './RadioGroup';
import { useMoviesApi } from '../hooks/useMovie.api';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [type, setType] = useState(null);
  const [year, setYear] = useState([1980, 2009]);
  const [debouncedYear, setDebouncedYear] = useState([1980, 2009]);

  const { run: onSearchWithDebounce } = useDebounceFn(
    (e) => {
      setSearchValue(e);
      resetSearch();
    },
    { wait: 500 }
  );

  const { run: onYearChangeWithDebounce } = useDebounceFn(
    () => {
      setDebouncedYear(year);
      resetSearch();
    },
    { wait: 500 }
  );
  const selectType = (e) => {
    setType(e.target.value);
    resetSearch();
  };

  const {
    page,
    movies,
    totalResultsCount,
    lastElementRef,
    fetchMovies,
    resetSearch,
  } = useMoviesApi(debouncedYear[0], debouncedYear[1]);

  const yearChange = (event, newValue) => {
    setYear(newValue);
    onYearChangeWithDebounce();
  };

  useEffect(() => {
    fetchMovies(searchValue, page, type);
  }, [searchValue, page, type, debouncedYear]);

  return (
    <>
      <div className={styles.header}>
        <SearchBox
          searchValue={searchValue}
          setSearchValue={onSearchWithDebounce}
        />
        <div className={styles.filter}>
          <RangeSlider onChange={yearChange} value={year} />
          <RadioGroup onChange={selectType} />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.sideBar}>
          <span style={{ padding: '30px' }}>{totalResultsCount} RESULTS</span>
          <div
            className={styles.sideBarScroll}
            style={{ overflowY: 'scroll', height: '100%' }}>
            <br />
            <MovieList
              movies={movies}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              lastElementRef={lastElementRef}
            />
          </div>
        </div>
        <div className={styles.mainContent}>
          {selectedMovie && <MovieContent movieId={selectedMovie} />}
        </div>
      </div>
    </>
  );
};

export default Home;
