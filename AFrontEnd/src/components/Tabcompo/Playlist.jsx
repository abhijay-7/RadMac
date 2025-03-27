import React from "react";
import ComingSoon from "../ComingSoon";

const Playlist = () => {
  return (
    <>
      <div class=" flex items-center w-ful">
        <div class="flex w-full m-2 bg-gray-700 shadow-md rounded-lg overflow-hidden ">
          <div class="flex flex-col w-full">
            <div class="flex flex-col sm:flex-row items-center p-5">
              tmep
              <div class="flex items-center">
                <div class="flex space-x-3 p-2">name </div>
              </div>
            </div>

            <div class="flex flex-col p-5">
              <div class="border-b pb-1 flex justify-between items-center mb-2">
                <span class=" text-base font-semibold uppercase text-white">
                  {" "}
                  play list
                </span>
               
              </div>
              {/* // list  1 */}

              <div class="flex border-b py-3 cursor-pointer hover:shadow-md px-2 ">
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
              </div>
              {/* // list  2 */}
              <div class="flex border-b py-3 cursor-pointer hover:shadow-md px-2 ">
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
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
