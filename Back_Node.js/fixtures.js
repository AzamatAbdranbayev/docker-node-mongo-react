const mongoose = require("mongoose");
const config = require("./app/config");
const { nanoid } = require("nanoid");
const Album = require("./app/models/Album");
const Artist = require("./app/models/Artist");
const Track = require("./app/models/Track");
const TrackHistory = require("./app/models/TrackHistory");
const User = require("./app/models/User");

mongoose.connect(config.db.url + "/" + config.db.name);

const db = mongoose.connection;

db.once("open", async () => {
  try {
    await db.dropCollection("albums");
    await db.dropCollection("artists");
    await db.dropCollection("trackhistories");
    await db.dropCollection("tracks");
    await db.dropCollection("users");
  } catch (e) {
    console.log("Error with drop collection");
  }

  const [firstArtist, secondArtist] = await Artist.create(
    { name: "2pac", information: "2pac information", photo: "2pac.jpeg" },
    { name: "50cent", information: "50-cent information", photo: "50-cent.jpg" }
  );

  const [firstAlbom, secondAlbom] = await Album.create(
    {
      name: "Loyal to the Game",
      artist: firstArtist._id,
      yearIssue: 1990,
      photo: "Loyal_to_the_Game.jpg",
    },
    {
      name: "Animal Ambition",
      artist: secondArtist._id,
      yearIssue: 1999,
      photo: "Animal_Ambition_An_Untamed_Desire_to_Win.jpg",
    }
  );

  const [firstTrack, secondTrack] = await Track.create(
    {
      name: "first track name",
      album: firstAlbom._id,
      duration: "03:55",
      number: 1,
    },
    {
      name: "tracnk name best",
      album: secondAlbom._id,
      duration: "05:00",
      number: 10,
    }
  );

  const [firstUser, secondUser] = await User.create(
    { username: "admin", password: "admin", token: nanoid() },
    { username: "asd", password: "asd", token: nanoid() }
  );

  const [trackHistoryFirst, trackHistorySecond] = await TrackHistory.create(
    {
      userID: firstUser._id,
      trackID: firstTrack._id,
      datetime: new Date().toISOString(),
    },
    {
      userID: secondUser._id,
      trackID: secondTrack._id,
      datetime: new Date().toISOString(),
    }
  );

  await db.close();
});
