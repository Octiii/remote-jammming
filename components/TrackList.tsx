// components/PlayList.tsx
import React from 'react';
// Make sure this points to your new CSS module
import styles from './TrackList.module.css';

interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  uri: string;
}

interface PlayListProps {
  RemoveTrack: (song: Song) => void;
  PlaylistTracks: Song[];
  PlaylistName: string;
  NameInput: (name: string) => void;
  onSave: () => void;
}

export default function PlayList({
  RemoveTrack,
  PlaylistTracks,
  PlaylistName,
  NameInput,
  onSave
}: PlayListProps) {
  
  return (
    <div className={styles.playlist}> {/* The Glass Panel */}
      
      {/* The Title Input */}
      <input 
        className={styles.playlistInput}
        value={PlaylistName}
        onChange={(e) => NameInput(e.target.value)}
        placeholder="New Playlist"
      />

      {/* The Scrollable List Container */}
      <div className={styles.trackListWrapper}>
        {PlaylistTracks.map((song) => (
          <div 
            key={song.id} 
            className={styles.trackItem} // Interactive Hover Effect
            onClick={() => RemoveTrack(song)} 
          >
            {/* Optional: Make the text look nicer */}
            <div style={{ fontWeight: 'bold' }}>{song.name}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              {song.artist} | {song.album}
            </div>
          </div>
        ))}
      </div>
      
      {/* The Big Green Button */}
      <button 
        className={styles.saveButton} 
        onClick={onSave}
      >
        SAVE TO SPOTIFY
      </button>
      
    </div>   
  );
}