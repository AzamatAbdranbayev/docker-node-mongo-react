const path = require("path");
const rootPath = __dirname;
module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, "../public/uploads"),
  db: {
    name: "lastFm",
    url: `mongodb://mongo:27017`,
  },
};
