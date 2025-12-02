// components/SearchBar.tsx
import React, { useState } from 'react';
import styles from './SearchBar.module.css'; 

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    if (term) {
      onSearch(term);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <input 
        className={styles.searchInput}
        placeholder="Enter A Song Title" 
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
}