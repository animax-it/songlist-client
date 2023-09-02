import React, { useState, useEffect } from 'react';
import GenreList from './components/Genrelist';
import SongList from './components/Songlist';
import SongDetails from './components/Songdetails';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';



import SongForm from './components/Songform';

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSong, setSelectedSong] = useState("");
  const [songs, setSongs] = useState([]);
  const [songTitles,setSongTitles] = useState([])
  const [allSongs, setAllSongs] = useState([])
  const [searchQuery, setSearchQuery] = useState('');


  // Fetch genres from the database
  // useEffect(() => {
  //   // Make API call to retrieve genres
  //   fetch('/api/genres')
  //     .then((response) => response.json())
  //     .then((data) => setGenres(data))
  //     .catch((error) => console.error('Error retrieving genres:', error));
  // }, []);

  function extractUniqueGenres(data) {
    const uniqueGenres = new Set();
  
    data.forEach(item => {
      item.genres.forEach(genre => {
        uniqueGenres.add(genre);
      });
    });
  
    return Array.from(uniqueGenres);
  }
  
  useEffect(() => {
    fetch('http://localhost:3001/api/songs/')
      .then(response => response.json())
      .then(data => {
        const uniqueGenres = extractUniqueGenres(data);
        console.log(uniqueGenres);
        setGenres(uniqueGenres)
        setAllSongs(data);
        const songst = data.map(song => song.title);
        setSongTitles(songst)
        console.log(songst);
      })
      .catch(error => {
        console.error('Error retrieving songs:', error);
      });
  }, []);
  
  console.log(allSongs);
 

  
  function handleGenreSelect(genre) {
    fetch(`http://localhost:3001/api/songs?genre=${genre}`)
      .then(response => response.json())
      .then(data => {
       
          const songsWithGenre = data.filter(song => song.genres.includes(genre));
          const songTitles = songsWithGenre.map(song => song.title);
          console.log(songTitles);
          setSongTitles(songTitles)

        
      })
      .catch(error => {
        console.error('Error retrieving songs:', error);
      });
  }

  // Fetch songs based on the selected genre
  useEffect(() => {
    if (selectedGenre) {
      // Make API call to retrieve songs based on the selected genre
      fetch(`http://localhost:3001/api/songs?genre=${selectedGenre}`)
        .then((response) => response.json())
        .then((data) => {setSongs(data)
          console.log(data)
        })
        .catch((error) => console.error('Error retrieving songs:', error));
    }
    filterSongs()
  }, [selectedGenre, searchQuery]);

  const handleSongClick = title => {
    const selectedSong = allSongs.find(song => song.title === title);
    setSelectedSong(selectedSong);
    console.log(selectedSong)
  };

  // const handleSongSelect = (songId) => {
  //   // Make API call to retrieve the song details based on songId
  //   fetch(`/api/songs/${songId}`)
  //     .then((response) => response.json())
  //     .then((data) => setSelectedSong(data))
  //     .catch((error) => console.error('Error retrieving song details:', error));
  // };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    
  };

  const filterSongs = () => {
    const filteredSongs = allSongs.filter((song) => {
      // Check if the search query is present in the song title or scale
      return (
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.scale.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    console.log(filteredSongs)

    const filteredSongTitles = []
    filteredSongs.map((song)=>{
      filteredSongTitles.push(song.title)
    })
    setSongTitles(filteredSongTitles)
  }
  
  

  return (
    <div className="app">
      <GenreList
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreSelect={handleGenreSelect}
      />
      <div className="container-wrapper">
        <div className="container left">
        <Link to="/Songform">
            <button style={{borderRadius:'2px'}}>Add song</button>
          </Link>
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by title or scale..."
            />
          </div>
          <h3>Songs</h3>
          <ul>
            {songTitles.map((title) => (
              <li className='details-card' style={{marginLeft:'-30px'}} key={title} onClick={() => handleSongClick(title)}>
                {title}
              </li>
            ))}
          </ul>
         
        </div>
        <div className="container right">
          <div className="details-header">
            <h2>{selectedSong.title || "Select a song "}</h2>
            {selectedSong && (
              <Link to={"/songForm"} state={{ selectedSong: selectedSong }}>
                <FaEdit className="edit-button" />
              </Link>
            )}
          </div>
          <div className="details-form">
            <div className="details-labels">
              <p className='details-card'>{ selectedSong.scale || "Scale: " }</p>
              <p className='details-card'>{ selectedSong.chords || "Chords: " } </p>
              {/* <p className='details-card'>{ selectedSong.genres + " " || "Genre: "}  &nbsp;</p> */}
              <p className='details-card'>{ selectedSong.transposed_chords  || "Transposed chords:"}</p>
              
            </div>
            <div className="details-values">
              
              <div className="lyrics-content">
              <h3>Lyrics:</h3>
                {selectedSong.lyrics &&
                  selectedSong.lyrics.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  
};

export default Home;
