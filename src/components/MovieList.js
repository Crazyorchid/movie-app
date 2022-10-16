/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import styles from '../styles/MovieList.module.css';

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          className={styles.movieList}
          onClick={() => props.setSelectedMovie(movie.imdbID)}>
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            className={styles.cardPoster}
            src={movie.Poster}
            width={80}
            height={80}
            alt='movie'></img>
          <box style={styles.cardTitle}>
            <span>{movie.Title}</span>
            <br />
            <span style={{ color: 'gray' }}>{movie.Year}</span>
            {/* <div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div> */}
          </box>
        </div>
      ))}
    </>
  );
};

export default MovieList;
