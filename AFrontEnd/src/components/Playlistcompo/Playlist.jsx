import React from 'react';

const Playlist = () => {
  // Sample playlist data
  const playlistData = [
    {
      id: 1,
      title: "I think I need a sunrise, I'm tired of the sunset",
      artist: "Boston",
      album: "Augustana",
      duration: "04:00",
      currentTime: "02:00",
      progress: 50,
      coverArt: "https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200",
      isPlaying: true
    },
    {
      id: 2,
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      duration: "05:56",
      currentTime: "01:30",
      progress: 25,
      coverArt: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=200",
      isPlaying: false
    },
    {
      id: 3,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: "05:55",
      currentTime: "03:22",
      progress: 60,
      coverArt: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=200",
      isPlaying: false
    }
  ];

  // Find the currently playing track
  const nowPlaying = playlistData.find(track => track.isPlaying);

  return (
    <div className="w-full p-4">
      <div className='w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mx-auto'>
        {/* Now Playing Section */}
        {nowPlaying && (
          <div className="flex p-5 border-b">
            <img 
              className='w-20 h-20 object-cover rounded-lg' 
              alt='Album cover' 
              src={nowPlaying.coverArt}
            />
            <div className="flex flex-col px-4 w-full">
              <span className="text-xs text-gray-700 uppercase font-medium">
                now playing
              </span>
              <span className="text-sm text-red-500 capitalize font-semibold pt-1">
                {nowPlaying.title}
              </span>
              <span className="text-xs text-gray-500 uppercase font-medium">
                -"{nowPlaying.artist}"
              </span>
              <div className="flex justify-end space-x-3 mt-1">
                <button className="w-5 h-5">
                  <img 
                    className="w-full" 
                    src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png" 
                    alt="Like"
                  />
                </button>
                <button className="w-5 h-5">
                  <img 
                    className="w-full" 
                    src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png" 
                    alt="Add to playlist"
                  />
                </button>
                <button className="w-5 h-5">
                  <img 
                    className="w-full" 
                    src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png" 
                    alt="Share"
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Player Controls */}
        <div className="flex flex-col sm:flex-row items-center p-5">
          <div className="flex items-center">
            <div className="flex space-x-3 p-2">
              <button className="focus:outline-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                  <line x1="5" y1="19" x2="5" y2="5"></line>
                </svg>
              </button>
              <button className="rounded-full w-10 h-10 flex items-center justify-center pl-0.5 ring-1 ring-red-400 focus:outline-none">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
              <button className="focus:outline-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
              </button>
            </div>
          </div>
          
          {nowPlaying && (
            <>
              <div className="relative w-full sm:w-1/2 md:w-7/12 lg:w-4/6 ml-2">
                <div className="bg-red-300 h-2 w-full rounded-lg"></div>
                <div 
                  className="bg-red-500 h-2 rounded-lg absolute top-0" 
                  style={{ width: `${nowPlaying.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-end w-full sm:w-auto pt-1 sm:pt-0">
                <span className="text-xs text-gray-700 uppercase font-medium pl-2">
                  {nowPlaying.currentTime}/{nowPlaying.duration}
                </span>
              </div>
            </>
          )}
        </div>
        
        {/* Playlist Section */}
        <div className="flex flex-col p-5">
          <div className="border-b pb-1 flex justify-between items-center mb-2">
            <span className="text-base font-semibold uppercase text-gray-700">Playlist</span>
            <button className="w-4 focus:outline-none">
              <img 
                className="w-full" 
                src="https://p.kindpng.com/picc/s/152-1529312_filter-ios-filter-icon-png-transparent-png.png" 
                alt="Filter"
              />
            </button>
          </div>

          {playlistData.map((track) => (
            <div 
              key={track.id} 
              className={`flex border-b py-3 cursor-pointer hover:shadow-md px-2 ${track.isPlaying ? 'bg-red-50' : ''}`}
            >
              <img 
                className='w-10 h-10 object-cover rounded-lg' 
                alt='Album cover' 
                src={track.coverArt}
              />
              <div className="flex flex-col px-2 w-full">
                <span className={`text-sm capitalize font-semibold pt-1 ${track.isPlaying ? 'text-red-500' : 'text-gray-800'}`}>
                  {track.title}
                </span>
                <span className="text-xs text-gray-500 uppercase font-medium">
                  -"{track.artist}"
                </span>
              </div>
              <span className="text-xs text-gray-500 self-center">
                {track.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;