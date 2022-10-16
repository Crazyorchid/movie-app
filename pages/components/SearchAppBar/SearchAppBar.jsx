import React from 'react';
import styles from "./SearchAppBar.module.scss"
import { FaSearch  } from 'react-icons/fa';
import SearchBox from './../SearchBox/SearchBox';

export default function SearchAppBar() {
  return (
    <div
      className={styles.searchBanner}
    >
      <div>   
        <SearchBox />
      </div>
    </div>
  );
}
