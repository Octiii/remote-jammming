"use client"
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import React from 'react';
import SearchBar from '../../components/SearchBar';
import SearchResults from "../../components/SearchResults";
import PlayList from "../../components/TrackList";
import { Spotify } from "./lib/spotify"

export default function Home() {

  const [token, setToken] = useState<string>("");
   
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // This function handles the login logic
    const initiateLogin = async () => {
      // 1. Check if we have a code in the URL (Coming back from Spotify)
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        // We have a code! Swap it for a token.
        const accessToken = await Spotify.getAccessToken(code);
        setToken(accessToken);
        const profileData = await Spotify.getProfile(accessToken);
        setProfile(profileData);
        // Clean the URL
        window.history.pushState({}, "", "/");
      } else {
        // 2. No code. Do we have a token already? (Optional: add local storage check here later)
        // If not, start the login flow.
        if (!token) {
           // This line redirects the user to Spotify
           await Spotify.redirectToAuthCodeFlow();
        }
      }
    };

    initiateLogin();
  }, []); // Run once on mount

  const [searchResults, setSearchResults] = useState<Song[]>([]);

  const [playlistTrack, setPlaylistTrack] = useState<song[]>([]); 

  const executeSearch = async (term: string) => {

    console.log("Serching fro:", term);

    const results = await Spotify.search(term, token);

    setSearchResults(results);

  };

  const [playlistName, setPlaylistName] = useState<string>("");

  const [duplicateErrorId, setDuplicateErrorId] = useState("")

 function addTrack (song) {
  
  if (playlistTrack.find( track => song.id === track.id)) {
    setDuplicateErrorId(song.id);
    setTimeout(() => setDuplicateErrorId(""), 1000);
  }
  else 
  setPlaylistTrack(prevTracks => [...prevTracks, song])
 };

 function removeTrack (song) {
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
    //alert(`"Saving Playlist: ${playlistName} with ${playlistTrack.length} songs."`);
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