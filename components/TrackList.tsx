import React from 'react';
import styles from '../src/app/page.module.css'

export default function PlayList ({RemoveTrack, PlaylistTracks, PlaylistName, NameInput, onSave}) {
    return (

      <div className={styles.playlist}>
        <input className={styles.nameBar}
        value={PlaylistName}
        onChange={(e) => NameInput(e.target.value)} 
        />
        {PlaylistTracks.map(song => (
          <div key={song.id} onClick={() => RemoveTrack(song)} >{song.name}</div>
        ))}
      <button
      onClick={onSave}
      className={styles.saveButton}
      >
        Save to Spotify (dosent work yet).
      </button>


      </div>
      
    );
};