const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const refreshSpeed = 00;

var listOfObjectsToUpdate = [];

map = new Map();
hero = new Hero(500, 500);
fov = new FieldOfView(hero);
// foe = new Foe();
// swirlStateDisplayer = new AbilityStateDisplayer('swirlAbility', hero, 1);

const dt1 = 20;
const dt2 = 1000;
var integerUpdateState = -dt1;
var integerUpdateState2 = -dt2;

// listOfObjectsToUpdate.push(swirlStateDisplayer);

(function setup() {
  window.setInterval(() => {
    var date = new Date();
    if (Math.abs(integerUpdateState - date.getMilliseconds()) > dt1) {
      fov.drawMap(map);
      for (let i of listOfObjectsToUpdate) {
        i.update(date);
      }
      integerUpdateState = date.getMilliseconds();
    }
    if (Math.abs(integerUpdateState2 - (date.getSeconds()*1000+date.getMilliseconds())) > dt2) {
      console.log(listOfObjectsToUpdate.length);
      integerUpdateState2 = date.getSeconds()*1000+date.getMilliseconds();
    }
  }, refreshSpeed);
}());
