"use client"
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import React from 'react';
import SearchBar from '../../components/SearchBar';
import SearchResults from "../../components/SearchResults";
import PlayList from "../../components/TrackList";
import { Spotify } from "./lib/spotify"

export default function Home() {

  const dummySearchResults = [
    { id: '1', name: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across the Water' },
    { id: '2', name: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera' },
    { id: '3', name: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV' }
  ];

// useEffect(() => {
//     // This will either get the token or redirect to Spotify
//     console.log("Running getAccessToken..."); // For debugging
//     Spotify.getAccessToken(); 
//   }, []);
  
  interface song {
    id:string;
    name:string;
    artist:string;
    album:string;
  }

  const [playlistTracks, setPlalistTracks] = useState<song[]>([]); 

  const [input, setInput] = useState("");

  const [playlistName, setPlaylistName] = useState<string>("My Play List Name Here");

  const result = dummySearchResults.filter((song) => song.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()));

 function addTrack (song) {
  if (playlistTracks.find( track => song.id === track.id)) {
    alert(`"${song.name} is already in your playlist."`)
  }
  else 
  setPlalistTracks(prevTracks => [...prevTracks, song])
 };

 function removeTrack (song) {
    setPlalistTracks(
      prevTracks => prevTracks.filter(track => song.id !== track.id)
    )
 };

 function savePlaylist () {
  alert(`"Saving Playlist: ${playlistName} with ${playlistTracks.length} songs."`);
 };

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title} >Jammming</h1>
      <SearchBar Input={setInput} /*songList={dummySearchResults}*/ />

      <div className={styles.appContainer}>

      <SearchResults Result={result} AddTrack={addTrack} />

      <PlayList 
      RemoveTrack={removeTrack} 
      PlaylistTracks={playlistTracks} 
      PlaylistName={playlistName} 
      NameInput={setPlaylistName}
      onSave={savePlaylist}
      />

      </div>

    </main>
  );
}