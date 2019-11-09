const express = require("express");
const router = express.Router();
const csvManager = require("../../modules/csvManager");

/*
  groupMixer 로직 구현해보기
  level1에서는 모든 멤버를 json으로 가져온 후, 이를 배열에 저장하게 만듬
  level2에서는 group.csv를 읽어온 후, 배열의 groupIdx를 name으로 바꾼다.
  level3에서는 해야 할 로직
  입력 : 멤버들의 [멤버이름, 조이름] 으로 이루어진 배열을 원소로 가지는 배열
  출력 : 어떤 방식으로든 다른 순서의 배열 (기존 배열의 재배치)
    Plan A : 새로운 배열을 만든 후 바꾸기    
      1. 입력배열을 조 별로 나눈 부분배열 5개를 만든다.
      2. Math.random()을 이용해서 무작위 인덱스의 원소만 입력배열과 같은 크기의 새로운 배열을 만든 후 Array.push()를 해준다
      3. res.send()로 새로운 배열을 리소스로 보낸다.
    
    Plan A' : A 방식을 채택한 후, csv 파일에 접근하고, 각각의 이름들의 조 번호 자체를 바꾼다.
*/
router.get("/", (req, res, next) => {
  csvManager
    .read("member.csv")
    .then(jsonArr => {
      const groupSize = 6;
      jsonArr.forEach(element => {
        let rand = Math.floor(Math.random() * groupSize) + 1;
        element.groupIdx = rand;
      });
      return jsonArr;
    })
    .then(jsonArr => {
      csvManager.write("member.csv", jsonArr);
      res.json(jsonArr);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
