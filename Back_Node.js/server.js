require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const port = process.env.REACT_APP_BACK_PORT;
const mongoose = require("mongoose");
const config = require("./app/config");
const albums = require("./app/albums");
const artists = require("./app/artists");
const tracks = require("./app/tracks");
const users = require("./app/users");
const trackHistory = require("./app/track_history");
const cors = require("cors");
const corsOptions = {
  origin: `http://${process.env.REACT_APP_HOST_NAME}:${process.env.REACT_APP_FRONT_PORT}`,
  optionSuccessStatus: 200,
};
console.log(
  `{process.env.REACT_APP_HOST_NAME  - ${process.env.REACT_APP_HOST_NAME}:${process.env.REACT_APP_FRONT_PORT} `
);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

const run = async () => {
  try {
    await mongoose.connect(`${config.db.url}/${config.db.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb connected");
    app.use("/artists", artists());
    app.use("/tracks", tracks());
    app.use("/albums", albums());
    app.use("/users", users());
    app.use("/track_history", trackHistory());
    app.listen(port, () => {
      console.log("server started on port: ", port);
    });
  } catch (e) {
    console.log("some problem with connection mongo", e);
  }
};

run().catch(console.error);
console.log(process.env.REACT_APP_BACK_PORT);
console.log(process.env.REACT_APP_FRONT_PORT);
console.log(process.env.REACT_APP_HOST_NAME);
