import React from 'react';
import './styles.css';

const GenreList = ({ genres, selectedGenre, onGenreSelect }) => {
  return (
    <div className="genre-list">
      <div><h3>Genres</h3></div>
      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre}
            className={selectedGenre === genre ? 'selected' : ''}
            onClick={() => onGenreSelect(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
