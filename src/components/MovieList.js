/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../styles/MovieList.module.css';

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          className={styles.movieList}
          onClick={() => props.setSelectedMovie(movie.imdbID)}
          ref={
            index + 1 === props.movies.length ? props.lastElementRef : undefined
          }
          style={{
            backgroundColor:
              movie.imdbID === props.selectedMovie ? 'gray' : 'white',
          }}>
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
          </box>
        </div>
      ))}
    </>
  );
};

export default MovieList;
