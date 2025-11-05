import React from 'react'; 
import styles from '../src/app/page.module.css'

export default function SearchBar ({/*songList*/ Input}) {
    return (
        <div>
            <input 
            className={styles.searchInput}
            onChange={(e) => Input(e.target.value)} />
        </div>
    )
};