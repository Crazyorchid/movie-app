import React, { useCallback, useEffect, useRef, useState } from 'react';

export function useMovieApi() {
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);
  const [movie, setMovie] = useState(null);

  const fetchMovie = async (movieId) => {
    setIsLoadingMovie(true);
    const url = `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setIsLoadingMovie(false);

    if (responseJson) {
      setMovie(responseJson);
    }
  };

  return { isLoadingMovie, movie, fetchMovie };
}

export function useMoviesApi(startYear, endYear) {
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const [totalResultsCount, setTotalResultsCount] = useState(0);
  const [isLastPageReached, setIsLastPageReached] = useState(false);

  const filterMoviebyYear = (data, min, max) => {
    const finalData = data.filter(function (a) {
      return a.Year >= min && a.Year <= max;
    });

    const rest = () => {
      setIsLastPageReached(true);
      if (movies.length === 0) {
        setTotalResultsCount(0);
      }
    };
    finalData.length === 0
      ? rest()
      : setMovies((prevMovies) => {
          const filteredMovies = [...prevMovies, ...finalData];
          setTotalResultsCount(filteredMovies.length);
          return filteredMovies;
        });
  };

  const [page, setPage] = useState(1);
  const lastElementObserver = useRef();
  const lastElementRef = useCallback((node) => {
    if (lastElementObserver.current) lastElementObserver.current.disconnect();
    lastElementObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) lastElementObserver.current.observe(node);
  }, []);

  const fetchMovies = async (searchValue, page = 1, type = '') => {
    setIsLoadingMovies(true);
    const url = `https://www.omdbapi.com/?s=${searchValue}&page=${page}&type=${type}&apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}`;

    if (!isLastPageReached) {
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search) {
        filterMoviebyYear(responseJson.Search, startYear, endYear);
      }
    }

    setIsLoadingMovies(false);
  };

  const resetSearch = () => {
    setPage(1);
    setMovies([]);
    setIsLastPageReached(false);
  };

  return {
    isLoadingMovies,
    page,
    movies,
    totalResultsCount,
    lastElementRef,
    fetchMovies,
    resetSearch,
  };
}
