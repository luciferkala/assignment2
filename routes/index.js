var express = require("express");
var router = express.Router();
const apiRouter = require("./api/group");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/api/group", apiRouter);
module.exports = router;
