import React, { useState } from 'react';
import Listcompo from '../Playlistcompo/ListCompo';

const playlistData = [
  {
    id: 1,
    title: "Sunrise Serenade",
    artist: "Morning Vibes",
    album: "Chill Mornings",
    duration: "3:45",
    coverArt: "https://example.com/cover1.jpg"
  },
  {
    id: 2,
    title: "Midnight Melodies",
    artist: "Night Sounds",
    album: "Dreamy Nights",
    duration: "4:20",
    coverArt: "https://example.com/cover2.jpg"
  }
];

const Favourite = () => {
  const [currentTrackId, setCurrentTrackId] = useState(null);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">My Playlist</h2>
      <Listcompo 

      />
    </div>
  );
};

export default Favourite