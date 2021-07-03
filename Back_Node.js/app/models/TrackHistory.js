const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    trackID: {
      type: Schema.Types.ObjectId,
      ref: "Track",
      required: true,
    },
    datetime: {
      type: String,
    },
  },
  { versionKey: false }
);
TrackHistorySchema.methods.generateDate = function () {
  this.datetime = new Date().toISOString();
};
const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
module.exports = TrackHistory;
