const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const refreshSpeed = 0;

var listOfObjectsToUpdate = [];
var listOfObjectsToDraw = [];

map = new Map();
hero = new Hero(500, 500);
fov = new FieldOfView(hero);
// foe = new Foe();
// swirlStateDisplayer = new AbilityStateDisplayer('swirlAbility', hero, 1);

var integerUpdateState20milli = -20;

// listOfObjectsToUpdate.push(swirlStateDisplayer);

(function setup() {
  window.setInterval(() => {
    var date = new Date();
    if (Math.abs(integerUpdateState20milli - date.getMilliseconds()) > 20) {
      for (let i of listOfObjectsToUpdate) {
        i.update(date);
      }
      for (let i of listOfObjectsToDraw) {
        fov.drawMap(map);
        fov.draw(i);
      }
      integerUpdateState20milli = date.getMilliseconds();
    }
  }, refreshSpeed);
}());
