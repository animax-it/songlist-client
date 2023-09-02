import React from 'react';

const SongList = ({ songs, onSongSelect }) => {
  
  return (
    <div className="song-list">
      <h3>Songs</h3>
      <ul>
        {songs.map((song) => (
          <li key={song.id} onClick={() => onSongSelect(song.id)}>
            <div>
              <p>{song.name}</p>
              <p>Scale: {song.scale}</p>
              <p>Chords: {song.chords}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
