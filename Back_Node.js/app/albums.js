const express = require("express");
const router = express.Router();
const Album = require("./models/Album");
const Track = require("./models/Track");
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const config = require("./config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const createRouter = () => {
  router.get("/", async (req, res) => {
    if (!req.query.artist) {
      return res.send(await Album.find());
    }
    try {
      res.send(
        await Album.find({ artist: req.query.artist })
          .populate("artist", "name")
          .sort({ yearIssue: 1 })
      );
    } catch (e) {
      res.status(500).send(e);
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const album = await Album.find({ _id: req.params.id }).populate(
        "artist",
        "name information"
      );
      res.send(album);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.post("/", upload.single("photo"), async (req, res) => {
    const itsnotHase = await Album.findOne({ name: req.body.name });
    if (itsnotHase) {
      return res.status(400).send({
        error: `this album name ${req.body.name} hase not data base`,
      });
    }

    const newAlbum = { ...req.body };
    if (req.file) {
      newAlbum.photo = req.file.filename;
    }
    const album = new Album(newAlbum);
    try {
      await album.save();
      res.send(album);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  return router;
};

module.exports = createRouter;
