const express = require("express");
const router = express.Router();
const Artist = require("./models/Artist");
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
    res.send(await Artist.find());
  });

  router.post("/", upload.single("photo"), async (req, res) => {
    const itsnotHase = await Artist.findOne({ name: req.body.name });
    if (itsnotHase) {
      return res.status(400).send({
        error: `this artist name ${req.body.name}  hase not in data base`,
      });
    }
    const newArtist = { ...req.body };
    if (req.file) {
      newArtist.photo = req.file.filename;
    }
    const artist = new Artist(newArtist);
    try {
      await artist.save();
      res.send(artist);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  return router;
};

module.exports = createRouter;
