// components/SearchResults.tsx
import React from 'react';
import styles from './TrackList.module.css'; // Reusing the Playlist styles for consistency

// ... interface definitions ...

interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  uri: string;
}

interface SearchResultsProps {
  Result: Song[];                   // Must be a list of Songs
  AddTrack: (song: Song) => void;      // Must be a function that accepts a Song
  DuplicateErrorId?: string | null; // Optional string (The '?' means optional)
}

export default function SearchResults({ DuplicateErrorId, Result, AddTrack }: SearchResultsProps) {
  return (
    <div className={styles.playlist}> {/* Reuse the glass panel style */}
      <h2 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
        Results
      </h2>
      
      <div className={styles.trackListWrapper}>
        {Result.map((song) => (
          <div 
            key={song.id} 
            className={( song.id === DuplicateErrorId) ? styles.errorBlink : styles.trackItem} // Reuse the hover effect
            onClick={() => AddTrack(song)}
          >
             <div style={{ fontWeight: 'bold' }}>{song.name}</div>
             <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
               {song.artist} | {song.album}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};