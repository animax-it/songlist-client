import React from 'react';

const SongDetails = ({ song }) => {
//   const { title, scale, chords, genres, lyrics } = song;

  return (
    <div>
      <h2>{ 'Song Title'} dsdsd</h2>
      <p>Scale: { 'C Major'}</p>
      <p>Chords: { 'C, F, G'}</p>
      <p>Genre: { 'Rock'}</p>
      <div >
        <h3>Lyrics:</h3>
        <pre>{'Lorem ipsum dolor sit amet'}</pre>
      </div>
    </div>
  );
};

export default SongDetails;
