const User = require("../app/models/User");

const findUserByToken = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(401).send({ error: "No token presents" });
  }
  const user = await User.findOne({ token });

  if (!user) {
    return res.status(401).send({ error: "Wrong token. Unauthorized" });
  }
  req.user = user;
  next();
};
module.exports = findUserByToken;
