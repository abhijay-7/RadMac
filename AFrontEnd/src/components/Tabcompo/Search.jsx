import React, { useEffect , useState} from 'react'
import List from './List'
import { BiSolidUpvote } from 'react-icons/bi'
import axios from 'axios'
import Fuse from 'fuse.js';


const Search = () => {
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
    <>
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
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
</div>

    <div className='m-2 p-2'>
        {
            filteredList.map((item, index) =>(
                <List key={index} item= {item}> </List>
            ))
        }
   
    
    </div>
    </>
    
  )
}

export default Search