import React from 'react';
import styles from '../../styles/MovieContent.module.css';
const MovieContent = () => {
  return (
    <>
      <div className={styles.movieList}>
        <img
          src='https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg'
          alt='movie'></img>
        <span>Star Wars: Episode IX - The Rise of Skywalker</span>
        <span>rated:PG</span>
        <span>Year</span>
        <span>Action, Adventure, Fantasy</span>
        <span>Actors:Mark Hamill, Harrison Ford, Carrie Fisher</span>
        <hr />
        <span>
          Plot: The Imperial Forces, under orders from cruel Darth Vader, hold
          Princess Leia hostage in their efforts to quell the rebellion against
          the Galactic Empire. Luke Skywalker and Han Solo, captain of the
          Millennium Falcon, work together with the companionable droid duo
          R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel
          Alliance and restore freedom and justice to the Galaxy
        </span>
        <hr />
        <div className={styles.ratings}>
          <span>Internet Movie Database</span>
          <span>Rotten Tomatos</span>
          <span>Metacritc</span>
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
