import React, { useState } from "react";
import { FaTimes, FaImage, FaChevronDown, FaChevronUp } from "react-icons/fa";

const CreatePlaylistDialog = ({ onClose, onCreate }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [accessType, setAccessType] = useState("public");
  const [userName, setUserName] = useState("Admin");



  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      name: playlistName,
      description: showAdvanced ? description : "",
      coverArt: showAdvanced ? coverImage : "",
      accessType: showAdvanced ? accessType : "public",
      userName: userName ? userName : "Admin",
      songs: []
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-gray-800 rounded-lg w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white">Create New Playlist</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">
              Playlist Name *
            </label>
            <input
              type="text"
              required
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="My Awesome Playlist"
            />
          </div>
         

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-indigo-400 text-sm mb-4"
          >
            {showAdvanced ? (
              <>
                <FaChevronUp className="mr-1" size={12} />
                Hide Advanced Options
              </>
            ) : (
              <>
                <FaChevronDown className="mr-1" size={12} />
                Show Advanced Options
              </>
            )}
          </button>

          {showAdvanced && (
            <div className="space-y-4 mb-4">
               <div>
                <label className="block text-gray-300 text-sm mb-2">
                  User Name
                </label>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="What's this playlist about?"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="What's this playlist about?"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Cover Image URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="flex-1 bg-gray-700 rounded-l px-3 py-2 text-white focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    className="bg-gray-600 px-3 rounded-r text-gray-300 hover:bg-gray-500"
                  >
                    <FaImage />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Privacy Setting
                </label>
                <select
                  value={accessType}
                  onChange={(e) => setAccessType(e.target.value)}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default CreatePlaylistDialog;