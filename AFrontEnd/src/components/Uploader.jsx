import React, { useState } from 'react';
import axios from 'axios';

const AudioUploader = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [artist, setArtist] = useState('');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState({ message: '', className: '' });
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status and show progress
    setStatus({ message: '', className: '' });
    setProgress(0);
    setShowProgress(true);
    
    // Validate inputs
    if (!audioFile) {
      setStatus({ message: 'Please select an audio file', className: 'error' });
      setShowProgress(false);
      return;
    }
    
    if (!token) {
      setStatus({ message: 'Please enter a token', className: 'error' });
      setShowProgress(false);
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('artist', artist);
    
    try {
      setStatus({ message: 'Uploading...', className: '' });
      
      const response = await axios.post('/hi/api/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        }
      });

      setStatus({ 
        message: `Upload successful! File ID: ${response.data.fileId}`, 
        className: 'success' 
      });
      setAudioFile(null);
      setArtist('');
      setShowProgress(false);
      
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.error || error.message;
      setStatus({ message: `Error: ${errorMessage}`, className: 'error' });
      setShowProgress(false);
    }
  };

  return (
    <>
    <div className='flex m-3 p-5'>
      <a href="/home"><button>Go Home</button></a>
    </div>
    <div className="max-w-md mx-auto my-8 px-5">
  <form 
    id="uploadForm" 
    onSubmit={handleSubmit}
    className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700/50"
  >
    <div className="mb-6">
      <label htmlFor="audioFile" className="block text-gray-400 mb-2">Audio File</label>
      <input 
        type="file" 
        id="audioFile" 
        accept="audio/*" 
        required
        onChange={(e) => setAudioFile(e.target.files[0])}
        className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
      />
    </div>
    
    <div className="mb-6">
      <label htmlFor="artist" className="block text-gray-400 mb-2">Artist Name</label>
      <input 
        type="text" 
        id="artist" 
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
        className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
    
    <div className="mb-6">
      <label htmlFor="token" className="block text-gray-400 mb-2">Access Token</label>
      <input 
        type="password" 
        id="token" 
        value={token}
        onChange={(e) => setToken(e.target.value)}
        required
        className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
    
    <button 
      type="submit"
      className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg font-medium text-white transition-colors"
    >
      Upload
    </button>
    
    {showProgress && (
      <div className="mt-6 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-teal-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )}
    
    {status.message && (
      <div 
        id="status"
        className={`mt-4 p-4 rounded-lg ${
          status.className === 'success' 
            ? 'bg-green-900/50 text-green-400' 
            : status.className === 'error' 
              ? 'bg-red-900/50 text-red-400'
              : 'bg-transparent'
        }`}
      >
        {status.message}
      </div>
    )}
  </form>
</div>
</>

  );
};

export default AudioUploader;