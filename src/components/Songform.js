import React, { useState } from 'react';

const SongForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [scale, setScale] = useState('');
  const [chords, setChords] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format the data to be submitted
    const formData = {
      title,
      lyrics,
      scale,
      chords,
      genres: selectedGenres,
    };
    
    // Call the onSubmit function from the parent component
    onSubmit(formData);
    // Reset the form fields
    setTitle('');
    setLyrics('');
    setScale('');
    setChords('');
    setSelectedGenres([]);
  };

  return (
    <div>
      <h1>Add Song</h1>
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


      <label>Genres:</label>
      <div className="genre-checkboxes">
        <label>
          <input
            type="checkbox"
            value="slow"
            checked={selectedGenres.includes('slow')}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setSelectedGenres((prevGenres) => {
                if (isChecked) {
                  return [...prevGenres, 'slow'];
                } else {
                  return prevGenres.filter((genre) => genre !== 'slow');
                }
              });
            }}
          />
          Slow
        </label>
        <label>
          <input
            type="checkbox"
            value="rock"
            checked={selectedGenres.includes('rock')}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setSelectedGenres((prevGenres) => {
                if (isChecked) {
                  return [...prevGenres, 'rock'];
                } else {
                  return prevGenres.filter((genre) => genre !== 'rock');
                }
              });
            }}
          />
          Rock
        </label>
        {/* Add more genre options as needed */}
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default SongForm;
