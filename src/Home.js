import React, { useState, useEffect } from 'react';
import GenreList from './components/Genrelist';
import SongList from './components/Songlist';
import SongDetails from './components/Songdetails';
import { Link } from 'react-router-dom';

import SongForm from './components/Songform';

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([]);

  // Fetch genres from the database
  useEffect(() => {
    // Make API call to retrieve genres
    fetch('/api/genres')
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error('Error retrieving genres:', error));
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSelectedSong(null); // Reset selected song when a new genre is selected
  };

  // Fetch songs based on the selected genre
  useEffect(() => {
    if (selectedGenre) {
      // Make API call to retrieve songs based on the selected genre
      fetch(`/api/songs?genre=${selectedGenre}`)
        .then((response) => response.json())
        .then((data) => setSongs(data))
        .catch((error) => console.error('Error retrieving songs:', error));
    }
  }, [selectedGenre]);

  const handleSongSelect = (songId) => {
    // Make API call to retrieve the song details based on songId
    fetch(`/api/songs/${songId}`)
      .then((response) => response.json())
      .then((data) => setSelectedSong(data))
      .catch((error) => console.error('Error retrieving song details:', error));
  };
  

  return (
    <div className="app">
      <GenreList
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreSelect={handleGenreSelect}
      />
      <SongList songs={songs} onSongSelect={handleSongSelect} />
      <Link to="/Songform">
      <button>Add song</button>
    </Link>
    </div>
    
  );
};

export default Home;
