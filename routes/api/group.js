var express = require("express");
var router = express.Router();
const csvManager = require("../../modules/csvManager");

/* GET users listing. */
router.get("/", function(req, res, next) {
  let sGroup = [];
  csvManager
    .read("member.csv")
    .then(jsonArr => {
      sGroup = jsonArr.map(element => {
        let arr = [];
        arr.push(element.name);
        arr.push(element.groupIdx);
        return arr;
      });
    }) //level 1
    .then(
      csvManager.read("group.csv").then(arr => {
        let test = [];
        test = arr.map(element => {
          let tmp = [];
          tmp.push(element.groupIdx);
          tmp.push(element.name);
          return tmp;
        });
        sGroup.forEach(element => {
          for (var i of test) {
            if (element[1] === i[0]) element[1] = i[1];
          }
        });
        res.send(sGroup);
      }) //level 2
    )
    .catch(err => {
      console.log(err);
    });
});

router.get("/:groupIdx", function(req, res, next) {
  let groupId = req.params.groupIdx;
  let idxGroup = [];
  csvManager
    .read("member.csv")
    .then(jsonArr => {
      let tmp = [];
      tmp = jsonArr.filter(element => element.groupIdx === groupId);
      idxGroup = tmp.map(element => {
        let arr = [];
        arr.push(element.name);
        arr.push(element.groupIdx);
        return arr;
      });
    }) //level 1
    .then(
      csvManager.read("group.csv").then(arr => {
        let test = [];
        test = arr.map(element => {
          let tmp = [];
          tmp.push(element.groupIdx);
          tmp.push(element.name);
          return tmp;
        });
        idxGroup.forEach(element => {
          for (var i of test) {
            if (element[1] === i[0]) element[1] = i[1];
          }
        });
        res.send(idxGroup);
      }) // level 2
    )
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
