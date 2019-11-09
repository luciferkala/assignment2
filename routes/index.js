var express = require("express");
var router = express.Router();
const apiRouter = require("./api/group");
const groupMixer = require("./api/mixer");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/api/group", apiRouter);
router.use("/api/mixer", groupMixer);
module.exports = router;
