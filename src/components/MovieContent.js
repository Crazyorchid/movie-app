import { style } from '@mui/system';
import React, { useState, useEffect } from 'react';
import styles from '../styles/MovieContent.module.css';
const MovieContent = (props) => {
  // const contents = props.content;
  // const ratings = props.content.Ratings;
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const selectMovie = async (movieId) => {
    setLoading(true);
    const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${process.env.NEXT_PUBLIC_OMDb_API_KEY}`;
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
    return <h1>Loading...</h1>;
  }
  if (movieDetail === null) {
    return <></>;
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.generalContent}>
          <img
            className={styles.poster}
            src={movieDetail.Poster}
            alt={movieDetail.Title}></img>
          <div className={styles.description}>
            <h1>{movieDetail.Title}</h1>
            <span
              style={{
                border: '1px solid black',
                borderRadius: '5px',
                padding: '5px',
                marginRight: '10px',
              }}>
              {movieDetail.Rated}
            </span>
            <span>{movieDetail.Year}&nbsp;&#x2022;&nbsp;</span>
            <span>{movieDetail.Genre}&nbsp;&#x2022;&nbsp;</span>
            <span>{movieDetail.Runtime}</span>
            <br />
            <span style={{ fontSize: '1.5rem' }}>{movieDetail.Actors}</span>
            <br />
          </div>
        </div>
        <hr />
        <p style={{ fontSize: '1rem', marginBottom: '0' }}>
          {movieDetail.Plot}
        </p>
        <hr />
        <div className={styles.ratings}>
          {movieDetail.Ratings.map((rat, index) => (
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
