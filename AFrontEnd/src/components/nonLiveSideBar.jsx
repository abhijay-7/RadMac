import React, { useEffect, useState } from "react";
import axios from "axios";
import Fuse from 'fuse.js';



import MainTheme from "./Maintheme/MainTheme";
import { BiSolidUpvote, BiPlay  } from "react-icons/bi";
import './SongBox.css';
import './Layout.css';

const NonLiveSidebar = ({onSongClick}) => {

  const topbarHeight = '60px';
  const style = {
    '--ptop': topbarHeight
  };

  const [checkVal, setCheckval] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fuse, setFuse] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [keys, setKeys] = useState(['title']); 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [songList, setOsongList] = useState([]);
  const [filteredList, setsongList] = useState([]);
  
  useEffect(() => {
    axios
      .get("/api/list/")
      .then((response) => {
        console.log(response.data)
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
  }

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
      const searchResults = fuse.search(value).map(result => result.item);
      setResults(searchResults);
      // console.log(query)
      // console.log(searchResults);
      setsongList(searchResults);
    }
  };



  const handleSort = async (type) => {
    const sortedList = [...songList];
    console.log(songList);

    if (type === "All") {
      //by id
      sortedList.sort((a, b) => a.id - b.id)
      setsongList(sortedList);
    }
    else if (type === "Top") {
      // sort by votes in descending order 
      setsongList(sortedList.sort((a, b) => b.vote - a.vote));

    }
    else if (type === "List") {
      //TODO: 

    }

  }

 

  const handleupvote = async (id) => {
    try {
      const result = await axios.post("/api/list/top", { check: checkVal, id: id });
      setOsongList(result.data);
      setsongList(result.data);
      setCheckval(!checkVal);
      // console.log(result.data);
      updatelist();
    } catch (error) {
      console.log(error)

    }
  }


  const updatelist = () => {
    setOsongList((prevList) => prevList.sort((a, b) => b.vote - a.vote));
    setsongList((prevList) => prevList.sort((a, b) => b.vote - a.vote));
    // console.log(songList); // This log will always show the old list due to state updates being asynchronous.
  };




  return (
    <div  >
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className={`z-50 flex items-center p-2  ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-transform duration-300 ${sidebarOpen ? 'sm:hidden translate-x-4/5' : 'sm:hidden'
          }`}
        style={sidebarOpen ? { transform: 'translateX(80vw)' } : {}}
      >
        {sidebarOpen ? (
          // Close icon (X)
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        )}
      </button>

      {/* side bar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-80 h-screen transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
          } layout-body`}
        aria-label="Sidebar"
        style={style}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <htmlForm className="max-w-md mx-auto">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="default-search"
                    className="block w-full p-4 ps-10  pr-36 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search your song..."
                    value={query}
                    onChange={handleSearch}
                    required
                    style={{overflowX:'auto'}}
                  />
                  <div className="absolute end-2.5 bottom-2.5">
                    <button
                      type="button"
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 flex items-center justify-between w-32 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      style={{ width: '120px'  }}
                    >
                      <span style={{ paddingLeft: '5px' }}> {`By ${keys[0]}`} </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${dropdownVisible ? 'transform rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {dropdownVisible && (
                      <div
                        className="absolute right-0 z-50 mt-1 w-32 bg-blue-700 rounded-md shadow-lg text-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        style={{ width: '100px' }}
                      >
                        <ul className="py-1 px-3">
                          <li
                            onClick={() => {
                              handleKeyChange('title');
                              setDropdownVisible(false);
                            }}
                            className="block px-4 py-2 text-sm hover:bg-blue-800 cursor-pointer"
                          >
                            Title
                          </li>
                          <li
                            onClick={() => {
                              handleKeyChange('artist');
                              setDropdownVisible(false);
                            }}
                            className="block px-4 py-2 text-sm hover:bg-blue-800 cursor-pointer"
                          >
                            Artist
                          </li>
                          <li
                            onClick={() => {
                              handleKeyChange('album');
                              setDropdownVisible(false);
                            }}
                            className="block px-4 py-2 text-sm hover:bg-blue-800 cursor-pointer"
                          >
                            Album
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </htmlForm>
            </li>


            {/* NOte KEEP This */}
            {/* <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </a>
            </li> */}

            {/* NOte KEEP This */}



            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white"
              >
                <div className=" flex justify-between">
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 m-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={async () => { await handleSort("Top") }}
                  >
                    Top
                  </button>

                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 m-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={async () => { await handleSort("List") }}
                  >
                    List
                  </button>

                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 m-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={async () => { await handleSort("All") }}
                  >
                    All
                  </button>
                </div>
              </a>
            </li>

            <hr />

            {filteredList.map((item, index) => (
              <div className="py-2" key={item.id}>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap w-2 overflow-hidden">
                      <span className="layout-songText">

                        {item.title}
                      </span>
                    </span>
                    <button
                      className="p-1 pr-3 pl-3  hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      onClick={()=>{
                        
                        console.log("nlsidebar click",item.id )
                        onSongClick(item.id)
                        
                     }}

                    >
                      <BiPlay />
                    </button>
                   

                  </a>
                </li>

              </div>

            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default NonLiveSidebar;
