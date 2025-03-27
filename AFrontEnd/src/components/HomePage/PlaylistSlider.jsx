import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router";

const playlists = [
    {
      "id": 1,
      "name": "This Is Arijit Singh",
      "image": "https://cdn.dnaindia.com/sites/default/files/2017/11/05/622525-arijit-singh-110617.jpg?im=FitAndFill=(1200,900)"
    },
    {
      "id": 2,
      "name": "This Is A.R. Rahman",
      "image": "https://english.mathrubhumi.com/image/contentid/policy:1.8529620:1683198841/AFP_1P53FA.jpg?$p=60b3833&f=16x10&w=852&q=0.8"
    },
    {
      "id": 3,
      "name": "This Is Badshah",
      "image": "https://cdn.platinumlist.net/upload/artist/badshah_83-orig.jpg"
    },
    {
      "id": 4,
      "name": "This Is Shreya Ghoshal",
      "image": "https://rollingstoneindia.com/wp-content/uploads/2020/08/Shreya-Ghoshal-960x852.jpg"
    },
 
    {
      "id": 6,
      "name": "This Is The Weeknd",
      "image": "https://facts.net/wp-content/uploads/2024/09/50-facts-about-the-weeknd-1725897457.jpg"
    },
    {
      "id": 7,
      "name": "This Is Taylor Swift",
      "image": "https://cdn.britannica.com/53/264753-050-74DEFF87/Taylor-Swift-accepts-the-Album-Of-The-Year-award-for-Midnights-onstage-during-the-66th-GRAMMY-Awards-at-Cryptocom-Arena-on-February-04-2024.jpg?w=300"
    }
   
  ];
  

const PlaylistSlider = () => {
  return (
    <>
    <h2 className="m-2 mx-4 px-2">Top Artist</h2>
 
    <Swiper spaceBetween={10} slidesPerView={2} breakpoints={{
      640: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    }}>
      {playlists.map((playlist) => (
        <SwiperSlide key={playlist.id}>
        <Link to={'/comingsoon'}>
          <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition">
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-full h-40 rounded-md object-cover"
            />
            <p className="text-white text-sm font-semibold mt-2">{playlist.name}</p>
          </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};

export default PlaylistSlider;
