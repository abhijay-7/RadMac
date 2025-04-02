import React, { useEffect, useState } from "react";
import ComingSoon from "../ComingSoon";
import playlists from "../Playlistcompo/GenrePlaylist";
import { useParams } from "react-router";
import axios from "axios";
import Fuse from "fuse.js";
import List from "./List";

const Playlist = () => {
  const { id } = useParams();
  const categoryId = parseInt(id);

  // Find the category that matches the ID
  const list = playlists.find((item) => item.id === categoryId);

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
      .get("/api/list/")
      .then((response) => {
        console.log(response.data);
        setOsongList(response.data);
        setsongList(response.data);
        updatelist();
        // console.log(response.data);
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

  if (!list) {
    return <div>Category not found</div>;
  }
  return (
    <>
      <div class=" flex items-center w-ful">
        <div class="flex w-full m-2 bg-gray-900 shadow-md rounded-lg overflow-hidden ">
          <div class="flex flex-col w-full">
            <div class="flex flex-col sm:flex-row items-center p-5">
              {list.title}
              <div class="flex items-center">
                <div class="flex space-x-3 p-2"> {list.category}</div>
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

              {id == 0
                ?
                
                  filteredList.map((item, index) =>(
                      <List key={index} item= {item}> </List>
                  ))
              
                : list.songs.map((item, index) => (
                    <>
                      {/* // list  1 */}
                      <div className="">
                        <div
                          key={item.songId}
                          class="flex py-3 cursor-pointer hover:shadow-md px-2 "
                        >
                          <img
                            class="w-10 h-10 object-cover rounded-lg"
                            alt="User avatar"
                            src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                          />
                          <div class="flex flex-col px-1 w-full">
                            <span class="text-sm text-rhite capitalize font-semibold pt-1">
                              {item.songName}
                            </span>
                            <span class="text-xs text-gray-500 uppercase font-medium ">
                              {item.artist}
                            </span>
                          </div>
                        </div>
                        {/* // list  2 */}
                        {/* <div class="flex border-b py-3 cursor-pointer hover:shadow-md px-2 ">
                  <img
                    class="w-10 h-10 object-cover rounded-lg"
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                  />
                  <div class="flex flex-col px-2 w-full">
                    <span class="text-sm text-red-500 capitalize font-semibold pt-1">
                      I think I need a sunrise, I'm tired of the sunset
                    </span>
                    <span class="text-xs text-gray-500 uppercase font-medium ">
                      -"Boston," Augustana
                    </span>
                  </div>
                </div> */}
                      </div>
                    </>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
