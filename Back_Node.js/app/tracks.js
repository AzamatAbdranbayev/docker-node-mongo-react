const express = require("express");
const router = express.Router();
const Track = require("./models/Track");

const createRouter = () => {
  router.get("/", async (req, res) => {
    if (!req.query.album) {
      return res.send(await Track.find());
    }
    try {
      res.send(
        await Track.find({ album: req.query.album })
          .populate({
            path: "album",
            populate: { path: "artist" },
          })
          .sort({ number: 1 })
      );
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.post("/", async (req, res) => {
    const itsnotHase = await Track.findOne({ name: req.body.name });
    if (itsnotHase) {
      return res.status(400).send({
        error: `this track name ${req.body.name} hase not in data base`,
      });
    }

    const track = new Track(req.body);
    try {
      await track.save();
      res.send(track);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  return router;
};

module.exports = createRouter;
