"use client"
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import React from 'react';
import SearchBar from '../../components/SearchBar';
import SearchResults from "../../components/SearchResults";
import PlayList from "../../components/TrackList";
import { Spotify } from "./lib/spotify"

export default function Home() {

  interface song {
  id: string;
  name: string;
  artist: string;
  album: string;
  uri: string;
}

  interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  uri: string;
}

  const [token, setToken] = useState<string>("");
   
  const [profile, setProfile] = useState<any>(null);

  // In src/app/page.tsx useEffect:

useEffect(() => {
  const runAuth = async () => {
    // 1. Check if we ALREADY have a valid token in storage
    const cachedToken = await Spotify.getAccessToken(); 
    
    if (cachedToken) {
        // If yes, use it and load the profile immediately!
        setToken(cachedToken);
        const profile = await Spotify.getProfile(cachedToken);
        setProfile(profile);
        return; // Stop here, we are done.
    }

    // 2. If not, check if we are returning from Spotify with a code
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      const newToken = await Spotify.getAccessToken(code);
      setToken(newToken);
      const profile = await Spotify.getProfile(newToken);
      setProfile(profile);
      window.history.pushState({}, "", "/");
    } else {
      // 3. If no cached token AND no code, redirect to login
      await Spotify.redirectToAuthCodeFlow();
    }
  };

  runAuth();
}, []);

  const [searchResults, setSearchResults] = useState<Song[]>([]);

  const [playlistTrack, setPlaylistTrack] = useState<song[]>([]); 

  const executeSearch = async (term: string) => {

    console.log("Serching fro:", term);

    const results = await Spotify.search(term, token);

    setSearchResults(results);

  };

  const [playlistName, setPlaylistName] = useState<string>("");

  const [duplicateErrorId, setDuplicateErrorId] = useState("")

 function addTrack (song: song) {
  
  if (playlistTrack.find( track => song.id === track.id)) {
    setDuplicateErrorId(song.id);
    setTimeout(() => setDuplicateErrorId(""), 1000);
  }
  else 
  setPlaylistTrack(prevTracks => [...prevTracks, song])
 };

 function removeTrack (song: song) {
    setPlaylistTrack(
      prevTracks => prevTracks.filter(track => song.id !== track.id)
    )
 };

 async function savePlaylist () {
  
  const trackUris = playlistTrack.map(track => track.uri);
  const success = await Spotify.savePlaylist(playlistName, trackUris, token);
  if(success) {
    setPlaylistTrack([]);
    setPlaylistName("");
  }
  
 };

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title} >Remote-Jammming</h1>
      {profile ? (
        <div className={styles.userBadge}>
           Logged in as: <span>{profile.display_name}</span>
        </div>
      ) : (
        <div className={styles.userBadge}>Not Logged In</div>
      )}
      <SearchBar  onSearch={executeSearch} />

      <div className={styles.appContainer}>

      <SearchResults 
      Result={searchResults} 
      AddTrack={addTrack} 
      DuplicateErrorId={duplicateErrorId}
      />

      <PlayList 
      RemoveTrack={removeTrack} 
      PlaylistTracks={playlistTrack} 
      PlaylistName={playlistName} 
      NameInput={setPlaylistName}
      onSave={savePlaylist}
      />

      </div>

    </main>
  );
}