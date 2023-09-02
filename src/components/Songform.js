import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const genres = [
  { value: 'slow', label: 'Slow' },
  { value: 'rock', label: 'Rock' },
  { value: 'Pop', label: 'Pop' },
  { value: 'Dance', label: 'Dance' },
  { value: 'Love', label: 'Love' },
  { value: 'Fast', label: 'Fast' },
  { value: 'Mashup', label: 'Mashup' },


  // Add more genre options as needed
];

const SongForm = () => {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [scale, setScale] = useState('');
  const [chords, setChords] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [transposed_chords, setTransposed_chords] = useState('');

  const location = useLocation();
  const { selectedSong } = location.state || {}; // Accessing selectedSong from location.state
  const history = useNavigate();

  useEffect(() => {
    // Populate form fields if selectedSong is available (edit mode)
    if (selectedSong) {
      setTitle(selectedSong.title || '');
      setLyrics(selectedSong.lyrics || '');
      setScale(selectedSong.scale || '');
      setChords(selectedSong.chords || '');
      setSelectedGenres(selectedSong.genres || []);
      setTransposed_chords(selectedSong.transposed_chords || '');
    }
  }, [selectedSong]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Format the data to be submitted
    const formData = {
      title,
      lyrics,
      scale,
      chords,
      genres: selectedGenres,
      transposed_chords,
    };

    try {
      if (selectedSong) {
        // If selectedSong is present, it's an edit operation
        const response = await fetch(`http://localhost:3001/api/songs/${selectedSong.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Song edited successfully
          console.log('Song edited successfully');
        } else {
          // Error occurred while editing the song
          console.error('Error editing song:', response.status);
        }
      } else {
        // If selectedSong is not present, it's an add operation
        const response = await fetch('http://localhost:3001/api/songs/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Song added successfully
          console.log('Song added successfully');
        } else {
          // Error occurred while adding the song
          console.error('Error adding song:', response.status);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset the form fields
    setTitle('');
    setLyrics('');
    setScale('');
    setChords('');
    setSelectedGenres([]);
    setTransposed_chords('');
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this song?')) {
      return;
    }

    try {
      if (selectedSong) {
        // If selectedSong is present, it's an edit operation
        const response = await fetch(`http://localhost:3001/api/songs/${selectedSong.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Song deleted successfully
          console.log('Song deleted successfully');
          // Redirect to a different page (e.g., the list of all songs)
          history('/');
        } else {
          // Error occurred while deleting the song
          console.error('Error deleting song:', response.status);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>{selectedSong ? 'Edit Song' : 'Add Song'}</h1>
      <form onSubmit={handleSubmit} className="song-form">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}       
      />
<br/>
      <label htmlFor="lyrics">Lyrics:</label>
      <textarea
        id="lyrics"
        style={{
              width: '1241px',
              height: '509px'
          }}
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
      ></textarea>
      <br/>


      <label htmlFor="scale">Scale:</label>
      <input
        type="text"
        id="scale"
        value={scale}
        onChange={(e) => setScale(e.target.value)}
      />
      <br/>


      <label htmlFor="chords">Chords:</label>
      <input
        type="text"
        id="chords"
        value={chords}
        onChange={(e) => setChords(e.target.value)}
      />
      <br/>

      
      <label htmlFor="transposed_chords">TransposedChords:</label>
      <input
        type="text"
        id="transposed_chords"
        value={transposed_chords}
        onChange={(e) => setTransposed_chords(e.target.value)}
      />
      <br/>
        <label>Genres:</label>
        <div className="genre-checkboxes">
          {genres.map((genre) => (
            <label key={genre.value}>
              <input
                type="checkbox"
                value={genre.value}
                checked={selectedGenres.includes(genre.value)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setSelectedGenres((prevGenres) => {
                    if (isChecked) {
                      return [...prevGenres, genre.value];
                    } else {
                      return prevGenres.filter((selectedGenre) => selectedGenre !== genre.value);
                    }
                  });
                }}
              />
              {genre.label}
            </label>
          ))}
        </div>
        <button type="submit">{selectedSong ? 'Save Changes' : 'Submit'}</button>
        {selectedSong && (
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default SongForm;
