import React from "react";
import {  useNavigate , Link, href} from "react-router-dom";
import { useContext } from 'react';
import { PlayerContext } from "../Player/PlayerContext";
const List = ({item}) => {
  const navigate = useNavigate()
  const { playTrack } = useContext(PlayerContext);

  const handleplay =(id)=>{
    console.log(`item clicked ${id}`)

  }

  return (
    <>
    {/* <Link to={`/play/${item.id}`}> */}
    < div onClick={() => playTrack(item.id)}>
      <ul class=" flex flex-col w-full">
        <li class=" inline-flex items-center  m-3 gap-x-2 py-3 px-4 text-sm font-semibold text-white -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer">
          <div  class="group flex justify-between w-full hover:text-indigo-600">
            {" "}
            {item.title}{" "}
            {/* <span class="inline-flex items-center py-1 px-2 rounded-full text-xs font-semibold transition-all duration-150 bg-gray-300 text-gray-700 group-hover:bg-indigo-600 group-hover:text-white">
              03
            </span> */
            
            }
          </div>
        </li>
      </ul>
      </div>
      {/* </Link> */}
    </>
  );
};

export default List;
