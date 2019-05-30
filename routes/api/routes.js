const user = require("./user");
const message = require("./message");
const image = require("./image");
const comment = require("./comment");
const mark = require("./mark");
module.exports = function(app) {
  app.use("/api/users", user);
  app.use("/api/messages", message);
  app.use("/api/images", image);
  app.use("/api/comments", comment);
  app.use("/api/marks", mark);
};
