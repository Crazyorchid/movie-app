import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.module.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </div>
  );
}
