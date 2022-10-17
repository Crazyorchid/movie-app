import React, { useEffect } from 'react';
import styles from '../styles/MovieContent.module.css';
import { useMovieApi } from '../hooks/useMovie.api';
const MovieContent = (props) => {
  const { isLoadingMovie, movie, fetchMovie } = useMovieApi();

  useEffect(() => {
    fetchMovie(props.movieId);
  }, [props.movieId]);

  if (isLoadingMovie) {
    return <h1>Loading...</h1>;
  }
  if (movie === null) {
    return <></>;
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.generalContent}>
          <img
            className={styles.poster}
            src={movie.Poster}
            alt={movie.Title}></img>
          <div className={styles.description}>
            <h1>{movie.Title}</h1>
            <span
              style={{
                border: '1px solid black',
                borderRadius: '5px',
                padding: '5px',
                marginRight: '10px',
              }}>
              {movie.Rated}
            </span>
            <span>{movie.Year}&nbsp;&#x2022;&nbsp;</span>
            <span>{movie.Genre}&nbsp;&#x2022;&nbsp;</span>
            <span>{movie.Runtime}</span>
            <br />
            <span style={{ fontSize: '1.5rem' }}>{movie.Actors}</span>
            <br />
          </div>
        </div>
        <hr />
        <p
          style={{ fontSize: '1rem', marginBottom: '0', paddingRight: '2rem' }}>
          {movie.Plot}
        </p>
        <hr />
        <div className={styles.ratings}>
          {movie.Ratings.map((rat, index) => (
            // eslint-disable-next-line react/jsx-key
            <>
              <div className={styles.singleRating}>
                <span style={{ fontSize: '20px' }}>{rat.Value}&nbsp;</span>
                <br />
                <span>{rat.Source}&nbsp;&nbsp;</span>
              </div>
            </>
          ))}
        </div>

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
