const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    yearIssue: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { versionKey: false }
);

const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;
