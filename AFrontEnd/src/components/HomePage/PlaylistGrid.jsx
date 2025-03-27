import React from "react";
import photo from '../../assets/Playlist/popCover.jpeg'
import { Link } from "react-router";

const playlists = [
  {
    id: 1,
    name: "Kendrick Lamar",
    image: photo,
  },
  {
    id: 2,
    name: "Liked Songs",
    image: photo,
  },
  {
    id: 3,
    name: "Gold School",
    image: photo,
  },
  {
    id: 4,
    name: "Mustafa Zahid",
    image: photo,
  },
  {
    id: 5,
    name: "Arjit singh",
    image: photo,
  },
  {
    id: 6,
    name: "Anime Vibes",
    image: photo,
  },
];

const PlaylistGrid = () => {
  return (
    <>
     <div className="flex items-center mx-2 px-2">
      <h2>Recents </h2>
      </div>
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
     
      {playlists.map((playlist) => (
       <Link to={'/comingsoon'}>

       <div
          key={playlist.id}
          className="bg-black p-2 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition"
        >
          <div className="w-10 h-10">
          <img
            src={playlist.image}
            alt={playlist.name}
            className="w-10 h-10  object-fit "
          />
          </div>
          <div  className="px-4">
          <p className="text-white text-sm  font-semibold">{playlist.name}</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
    </>
  );
};

export default PlaylistGrid;
