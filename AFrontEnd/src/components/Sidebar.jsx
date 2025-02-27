import React, { useEffect, useState } from "react";
import axios from "axios";
import MainTheme from "./Maintheme/MainTheme";
import { BiSolidUpvote } from "react-icons/bi";
const Sidebar = () => {

  const[Checkval , setCheckval]   = useState(false);

  const [songList, setsongList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/list/")
      .then((response) => {
        
        setsongList(response.data);
updatelist();
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // handle vote update /////

  const handleupvote = async(id) =>{
    try {
      const result = await axios.post("/api/list/top", { check: Checkval ,id: id});
setsongList(result.data);
setCheckval(!Checkval);
// console.log(result.data);
updatelist();
    } catch (error) {
      console.log(error)
      
    }
  }

  
  const updatelist = () => {
    setsongList((prevList) => prevList.sort((a, b) => b.votes - a.votes));
    console.log(songList); // This log will always show the old list due to state updates being asynchronous.
  };


  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
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
      </button>

      {/* side bar */}
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-80  h-screen transition-transhtmlForm -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
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
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Get your song"
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
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
               <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 m-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Top</button>
               
               <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 m-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">List</button>

               <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 m-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">All</button>
               </div>
              </a>
            </li>
            
<hr />

            {songList.map((item, index) => (
              <div className="py-2"key={item.id}>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {item.title}
                    </span>
                    <p>{item.votes}</p>
                    <button
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      onClick={() => !Checkval && handleupvote(item.id)}
                    >
                      <BiSolidUpvote />
                    </button>
                  </a>
                </li>
                
              </div>
              
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
