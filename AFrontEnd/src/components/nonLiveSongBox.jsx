import React, { useState, useEffect } from 'react';
import axios from "axios";
import './SongBox.css';

const NonLiveSongBox = ({ height, width, apiUrl, bgColor }) => {
  const [songData, setSongData] = useState(null);

  // useEffect(() => {
  //   const fetchSongData = async () => {
  //     try {
  //       const response = await axios.get(apiUrl); // Use the provided apiUrl
  //       // console.log(response.data);
  //       setSongData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching song data:', error);
  //     }
  //   };

  //   // Fetch data immediately when the component mounts
  //   fetchSongData();

  //   // Set up an interval to fetch data every 5 seconds
  //   const intervalId = setInterval(fetchSongData, 5000);

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [songData]);
  useEffect(() => {

    console.log(apiUrl,"nlSbox")
    const fsong = () => axios.get(`/hi/${apiUrl}`)
      .then(
        (response) => {
          console.log(response.data);
          if (response.data != songData);
          setSongData(response.data);
        }
      ).catch((error) => {
        console.error('Error fetching song data:', error);
      });
    fsong();
    // const intervalId = setInterval(fsong, 5000);
    // console.log(songData);


  }, [apiUrl]);
  const imgUrls = [
    "https://i.ibb.co/XrHn9K5P/pexels-polinachistyakova-16353919.jpg",
    "https://i.ibb.co/qYfJbwzR/pexels-anniroenkae-2693200-1.jpg",
    "https://i.ibb.co/b5syK2TG/pexels-bymalens-2157896.jpg",
    "https://i.ibb.co/8gCyCyJx/pexels-bymalens-2157897-1.jpg",
    "https://i.ibb.co/xqQZWgzr/pexels-simeon-theartist-7861711.jpg",

  ];

  const getRandomValue = (inputNumber, range) => {
    // Use a deterministic approach for generating random number (e.g., using hash)
    const seed = inputNumber; // In practice, you could apply more complex logic for this
    const randomValue = (seed * 9304 + 49297) % 17; // A simple linear congruential generator
    const normalizedValue = randomValue / 17; // Normalize to [0, 1]
    return Math.floor(normalizedValue * range); // Map it to the given range
  };

  if (!songData) {
    console.log(apiUrl)
    return <div>Loading...</div>;
  }

  console.log(songData);
  const { title, artist, album, coverUrl, id, duration } = songData;
  console.log(id);

  return (
    <div className={`p-4 border-2 bg-black border-gray-200 border-dashed rounded-lg dark:border-gray-700`}>
      <div className="song-box-container">


        <div className="song-box" style={{ width: width, height: height }}>
          <div className="cover-container">
            <img src={imgUrls[getRandomValue(id, imgUrls.length)]} alt={`${name} cover`} className="cover-image" style={{ width: width * 0.8, height: height * 0.8 }} />
          </div>
          <div className="text-container" >
            <div >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
              </svg>
              <div className="song-name">{title}</div>
            </div>

            <div className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>

              <div className="artist-name">{artist}</div>
            </div>

            <div className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
              </svg>

              <div className="album-name pl-3">{album}</div>
            </div>

            <div className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

              <div className="album-name pl-3">{`${Math.floor(duration / 60)} : ${Math.floor(duration) % 60} `}</div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default NonLiveSongBox;
