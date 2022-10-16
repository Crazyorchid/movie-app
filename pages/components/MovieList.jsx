/* eslint-disable react/jsx-key */
import React from 'react';
import styles from '../../styles/MovieList.module.css'

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	const click = () => {
		console.log('clicked')
	}

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className={styles.movieList} onClick={click}>
					<img src={movie.Poster} width={100} height={100} alt='movie'></img>
					<span>{movie.Title}</span>
					<span>{movie.Year}</span>
					{/* <div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div> */}
				</div>
			))}
		</>
	);
};

export default MovieList;