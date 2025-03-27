import React from "react";
import ComingSoon from "../ComingSoon";
import playlists from "../Playlistcompo/GenrePlaylist";
import { useParams } from "react-router";

const Playlist = () => {
  const { id } = useParams();
  const categoryId = parseInt(id);

  // Find the category that matches the ID
  const list = playlists.find(item => item.id === categoryId);

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
                <div class="flex space-x-3 p-2">  {list.category}</div>
              </div>
            </div>
            <div class="flex flex-col p-2 ">
              <div class="border-b pb-1 flex justify-between items-center mb-2">
                <span class=" text-base font-semibold uppercase text-white">
                  {" "}
                 Playlist
                </span>
              </div>
              {list.songs.map((item, index) => (
                <>
                  {/* // list  1 */}
<div className="">


                  <div  key={item.songId} class="flex py-3 cursor-pointer hover:shadow-md px-2 ">
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
