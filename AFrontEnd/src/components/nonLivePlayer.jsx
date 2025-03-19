import React, { useState } from 'react';
import { use } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const NonLivePlayer = ({ Url }) => {
    const hostIp = import.meta.env.VITE_HOST_IP;
    const playerPort = import.meta.env.VITE_PLAYER_PORT
    const [bitrate, setBitrate] = useState('320k');

    const [streamUrl, setStreamUrl] = useState(Url);
    const [isPlaying, setIsPlaying] = useState(false);

    useState(() => {
        console.log("nlPlayer", Url)
                setStreamUrl(Url)

    }, [Url])
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };
    const handleSelect = (event) => {
        setBitrate(event.target.value);
    };
    console.log(streamUrl);

    return (
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 p-6 mt-0 rounded-xl shadow-2xl w-full ">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl text-white font-semibold mb-4">Audio Player</h2>

                {/* Audio player component */}
                <ReactAudioPlayer
                    src={Url}
                    controls
                    className="w-full rounded-md bg-white p-3 shadow-lg"
                />
                {/* Bitrate Dropdown */}
                {/* <div className="flex items-center justify-center space-x-4">
                    <label htmlFor="bitrate-dropdown" className="text-white font-medium">Select Bitrate: </label>
                    <select
                        id="bitrate-dropdown"
                        value={bitrate}
                        onChange={handleSelect}
                        className="bg-white text-gray-800 p-2 rounded-lg shadow-md"
                    >
                        <option value="128k">128k</option>
                        <option value="192k">192k</option>
                        <option value="256k">256k</option>
                        <option value="320k">320k</option>
                    </select>
                </div> */}
            </div>
        </div>

    );
};




export default NonLivePlayer;