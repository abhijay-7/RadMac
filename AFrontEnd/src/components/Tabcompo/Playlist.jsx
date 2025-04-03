import React, { useEffect, useState } from "react";
import ComingSoon from "../ComingSoon";
import playlists from "../Playlistcompo/GenrePlaylist";
import { useParams } from "react-router";
import axios from "axios";
import Fuse from "fuse.js";
import List from "./List";
import ListCompo from "../Playlistcompo/ListCompo";
import EmptyPlaylist from "../Playlistcompo/EmptyPlaylist";

const Playlist = () => {
  const { id } = useParams();
  const categoryId = parseInt(id);

  // Find the category that matches the ID
  const [list ,setList] = useState();

  const [checkVal, setCheckval] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fuse, setFuse] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [keys, setKeys] = useState(["title"]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [songList, setOsongList] = useState([]);
  const [filteredList, setsongList] = useState([]);

  useEffect(() => {
    axios
      .get(`/hi/playlist/${id}`)
      .then((response) => {
        console.log(response.data.songs);
        setOsongList(response.data.songs);
        setsongList(response.data.songs);
        setList(response.data);
        updatelist()
        // console.log(response.data);()
      })
      .catch((error) => {
        console.log(error);
      });


      
  }, []);
  

  useEffect(() => {
    const options = {
      keys: keys,
      threshold: 0.5,
    };
    const fuseInstance = new Fuse(songList, options);
    setFuse(fuseInstance);
    // console.log("hi hi");
    // console.log(fuseInstance);
  }, [keys, songList]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleKeyChange = (newKey) => {
    setKeys([newKey]);
    setDropdownVisible(false);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value == "") {
      setsongList(songList);
      return;
    }

    if (fuse) {
      const searchResults = fuse.search(value).map((result) => result.item);
      setResults(searchResults);
      // console.log(query)
      // console.log(searchResults);
      setsongList(searchResults);
    }
  };

  const [showEmptyState, setShowEmptyState] = useState(false);

  useEffect(() => {
    if (!list) {
      const timer = setTimeout(() => {
        setShowEmptyState(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [list]);

  if (!list) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {showEmptyState ? (
          <div className="animate-fade-in">
            <EmptyPlaylist />
          </div>
        ) : (
          <div className="text-gray-400">Loading playlist...</div>
        )}
      </div>
    );
  }
  return (
    <>
      <div class="  w-full">
        <div class="flex min-h-[830px] min-w-500px bg-gray-900 shadow-md rounded-lg overflow-hidden ">
          <div class="flex flex-col w-full">
            <div class="flex flex-col sm:flex-row items-center p-5">
              {list.name}
              <div class="flex items-center">
                <div class="flex space-x-3 m-2 p-2"> {list.description}</div>
              </div>
            </div>
            <div class="flex flex-col p-2 ">
              <div class="border-b pb-1 flex justify-between items-center mb-2">
                <span class=" text-base font-semibold uppercase text-white">
                  {" "}
                  Playlist
                </span>
              </div>

              <div className='m-2 p-2'>
<form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" id="default-search" value={query} onChange={handleSearch} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search songs " required />
    </div>
</form>
</div>

             
                {
                  filteredList.map((item, index) =>(
                    <ListCompo key={index} item= {item} ></ListCompo>
                  ))  
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
