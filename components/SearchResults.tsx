import React from 'react';
import styles from '../src/app/page.module.css'

export default function SearchResults ({Result, AddTrack}) {
    return (
        <div className={styles.searchResults}>
          {Result.map((song) => (
            <div onClick={() => AddTrack(song)} >{song.name}</div>
           ))}
        </div>
    );
};