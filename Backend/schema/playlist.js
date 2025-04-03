// models/Playlist.js
import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  filename: String,
  metadata: {
    title: String,
    artist: String,
    album: String,
    duration: Number,
    file: String,
    vote: Number,
    contentType: String,
    size: Number,
    uploadDate: Date
  }
});

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  coverArt: {
    type: String,
    required: false
  },
  userName: {
    type: String,
    required: true
  },
  accessType: {
    type: String,
    enum: ['public', 'private', 'shared'],
    default: 'private'
  },
  description: {
    type: String,
    default: ''
  },
  songs: [songSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
playlistSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;