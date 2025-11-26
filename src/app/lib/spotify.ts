// src/lib/spotify.ts

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = "https://dev.ningun.eu/";

// --- PKCE HELPER FUNCTIONS ---

function generateRandomString(length: number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// --- MAIN OBJECT ---

export const Spotify = {
  
  // Step 1: Redirect to Spotify (Start Login)
  async redirectToAuthCodeFlow() {
    const verifier = generateRandomString(128);
    const challenge = await generateCodeChallenge(verifier);

    // Save the "Fingerprint" so we can verify it when they come back
    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId || "");
    params.append("response_type", "code"); // <--- WE USE CODE NOW
    params.append("redirect_uri", redirectUri);
    params.append("scope", "playlist-modify-public playlist-modify-private user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  },

  // Step 2: Get Token (Finish Login)
  async getAccessToken(code: string) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId || "");
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier || "");

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const { access_token } = await result.json();
    return access_token;
  },

  // Search function (Requires token to be passed in)
  async search(term: string, token: string) {
    if (!token) return [];
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const json = await response.json();
    return json.tracks?.items.map((t: any) => ({
        id: t.id,
        name: t.name,
        artist: t.artists[0].name,
        album: t.album.name,
        uri: t.uri
    })) || [];
  },
  //Profile getting code 
  async getProfile(token: string) {
    if (!token) return null;
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;

    }
  },

  async savePlaylist(name: string, trackUris: string[], token: string) {
    // 1. Check if there is data to save
    if (!name || !trackUris.length) {
      return;
    }

    // Headers for every request
    const headers = { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    let userId;

    try {
      // --- REQUEST 1: Get User ID ---
      // Endpoint: https://api.spotify.com/v1/me
      const response = await fetch('https://api.spotify.com/v1/me', { headers });
      
      if (!response.ok) throw new Error('Failed to get user ID');
      
      const jsonResponse = await response.json();
      userId = jsonResponse.id;

      // --- REQUEST 2: Create the Playlist ---
      // Endpoint: https://api.spotify.com/v1/users/{user_id}/playlists
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 
            name: name,
            description: "Created with Jammming" 
        })
      });

      if (!createPlaylistResponse.ok) throw new Error('Failed to create playlist');

      const playlistResponseJson = await createPlaylistResponse.json();
      const playlistId = playlistResponseJson.id;

      // --- REQUEST 3: Add Tracks to Playlist ---
      // Endpoint: https://api.spotify.com/v1/playlists/{playlist_id}/tracks
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ uris: trackUris })
      });

      if (!addTracksResponse.ok) throw new Error('Failed to add tracks');
      
      console.log("Playlist saved successfully!");
      return true; // Success!

    } catch (error) {
      console.error("Error saving playlist:", error);
      return false; // Failed
    }
  }

};