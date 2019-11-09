var express = require("express");
var router = express.Router();
const csvManager = require("../../modules/csvManager");

/* GET users listing. */
router.get("/", function(req, res, next) {
  csvManager
    .read("member.csv")
    .then(jsonArr => {
      return jsonArr;
    })
    //level 1
    .then(jsonArr =>
      csvManager
        .read("group.csv")
        .then(arr => {
          jsonArr.forEach(element => {
            for (var i of arr) {
              if (element.groupIdx === i.groupIdx) element.groupIdx = i.name;
            }
          });
          res.json(jsonArr);
        })
        .catch(err => {
          console.log(err);
        })
    );
  //level 2
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
