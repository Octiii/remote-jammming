# 🎵 Jammming

Jammming is a web application that allows users to search the Spotify library, create a custom playlist, name it, and then save the playlist directly to their Spotify account.

This project is built using React (with Next.js) and TypeScript, and it connects directly to the Spotify API for all data.

---

## 📸 Project Screenshot


(Soon)

---

## 📈 Project Status

This project is currently in development. The local user interface and state management are complete, and the next step is to integrate the Spotify API.
Edit: The API is now implemented and users can search for songs on Spotify, add them to a play list, name the play list and save it to their account. 

### Implemented Features (Local State)

* **Component Structure:** App is fully component-based using React/Next.js (`Home`, `SearchBar`, `SearchResults`, `Playlist`).
* **Dynamic Search:** A search bar that dynamically filters a hard-coded (mock) list of songs as the user types.
* **Add Tracks:** Users can click a song in the search results to add it to the playlist.
* **Duplicate Prevention:** The app correctly checks for duplicates and will not add the same song to the playlist twice.
* **Remove Tracks:** Users can click a song in the playlist to remove it.
* **Name Playlist:** Users can type in an input field to give their playlist a custom name.
* **State Management:** All state (`searchTerm`, `playlistTracks`, `playlistName`) is managed in the parent `Home` component (`page.tsx`) and passed down as props.
* **Remote Dev Environment:** The project is running successfully in a `code-server` instance on a remote server.
* **Version Control:** The project is an active Git repository pushed to GitHub.
* **Implement Spotify Authentication:** Get a user access token from the Spotify API.
* **Connect Search to API:** Update the search functionality to query the Spotify Search endpoint instead of using mock data.
* **Connect Save to API:** Implement the "Save to Spotify" button to:
    1.  Get the user's Spotify ID.
    2.  Create a new, empty playlist on their account.
    3.  Add the tracks from the `playlistTracks` state to that new playlist.

### To-Do / Next Steps

Search and Destory bugs. 
I am sure there are imporvments to be made, I just don't know what yet.

---

## 🛠️ Tech Stack

* **React:** The core library for building the user interface.
* **Next.js:** Used as the React framework and for the development server.
* **TypeScript:** For strong type-checking and a more robust codebase.
* **CSS Modules:** For component-level, scoped styling.
* **Spotify API:** Used for authentication, searching tracks, and saving playlists.

---

## 🚀 Getting Started

This project is being developed on a remote server using `code-server`.

### 1. Prerequisites

* A remote server running `code-server` (or a local machine with Node.js v18+).
* A registered application on the [Spotify Developer Dashboard]

### 2. Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/remote-jammming.git](https://github.com/your-username/remote-jammming.git)
    cd remote-jammming
    ```
    *(Replace with your actual GitHub repo URL)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set Up Your Spotify API Client ID:**
    * Create a new file in the root of the project named `.env.local`.
    * Add your Client ID from the Spotify Dashboard to this file:
        ```env
        NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your-client-id-goes-here
        ```
    * In your Spotify App settings, add the correct **Redirect URI** for your environment:
        `httpsIno.ningun.eu/absproxy/3000`

4.  **Run the development server:**
    * Ensure all Next.js config files (`next.config.ts`, `package.json`) are set up for the proxy environment.
    * Run the dev server:
        ```bash
        npm run dev
        ```

5.  Open the `code-server` preview URL (`httpsIno.ningun.eu/absproxy/3000`) in your browser to see the app.

---

## Acknowledgements

This project was built as part of the [Codecademy](https://www.codecademy.com/) Full-Stack Engineer career path.