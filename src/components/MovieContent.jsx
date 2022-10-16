import React, { useState, useEffect } from 'react';
import styles from '../styles/MovieContent.module.css';
const MovieContent = (props) => {
  // const contents = props.content;
  // const ratings = props.content.Ratings;
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const selectMovie = async (movieId) => {
    setLoading(true);
    const url = `http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setLoading(false);

    if (responseJson) {
      setMovieDetail(responseJson);
    }
  };

  useEffect(() => {
    selectMovie(props.movieId);
  }, [props.movieId]);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (movieDetail === null) {
    return <></>;
  }
  return (
    <>
      <div className={styles.movieList}>
        <img src={movieDetail.Poster} alt={movieDetail.Title}></img>
        <span>{movieDetail.Title}</span>
        <span>{movieDetail.Rated}</span>
        <span>{movieDetail.Year}</span>
        <span>{movieDetail.Genre}</span>
        <span>{movieDetail.Actors}</span>
        <hr />
        <span>{movieDetail.Plot}</span>
        <hr />
        {movieDetail.Ratings.map((rat, index) => (
          // eslint-disable-next-line react/jsx-key
          <div className={styles.ratings}>
            <span>{rat.Value}</span>
            <span>{rat.Source}</span>
          </div>
        ))}

        {/* <div
    				onClick={() => props.handleFavouritesClick(movie)}
    				className='overlay d-flex align-items-center justify-content-center'
    			>
    				<FavouriteComponent />
    			</div> */}
      </div>
    </>
  );
};

export default MovieContent;
