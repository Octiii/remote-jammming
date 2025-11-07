// src/lib/spotify.ts

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID; 
const redirectUri = "https://code.ningun.eu/absproxy/3000"; 
let accessToken: string | undefined;

export const Spotify = {
  getAccessToken() {
    // 1. Check if we already have a token
    if (accessToken) {
      return accessToken;
    }

    // 2. Check the URL for a token
    const accessTokenMatch = window.location.hash.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.hash.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = undefined), expiresIn * 1000);
      window.history.pushState('Access Token', '', '/absproxy/3000'); 
      return accessToken;
    } else {
      // 3. If no token, redirect to Spotify to log in
      const scope = 'playlist-modify-public';
      
      // THIS IS THE CORRECTED URL
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scope)}&redirect_uri=${redirectUri}`;
      
      window.location.href = authUrl;
    }
  }
};