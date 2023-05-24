import React from 'react';

const GenreList = ({ genres, selectedGenre, onGenreSelect }) => {
  return (
    <div className="genre-list">
      <h3>Genres</h3>
      <ul>
        {genres.map((genre) => (
          <li
            key={genre}
            className={selectedGenre === genre ? 'active' : ''}
            onClick={() => onGenreSelect(genre)}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
