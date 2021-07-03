const express = require("express");
const router = express.Router();
const TrackHistory = require("./models/TrackHistory");
const findUserByToken = require("../middleware/findUserByToken");
const createRouter = () => {
  router.post("/", findUserByToken, async (req, res) => {
    const trackHistory = new TrackHistory({
      ...req.body,
      ...{ userID: req.user._id },
    });
    trackHistory.generateDate();
    await trackHistory.save();
    res.send(trackHistory);
  });
  router.get("/", findUserByToken, async (req, res) => {
    const tracksList = await TrackHistory.find({
      userID: req.user._id,
    }).populate({
      path: "trackID",
      populate: {
        path: "album",
        populate: { path: "artist" },
      },
    }).sort({datetime:-1});
    res.send(tracksList);
  });
  return router;
};

module.exports = createRouter;
