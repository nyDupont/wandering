const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const refreshSpeed = 0;

var listOfObjectsToUpdate = [];

// map = new AbsoluteMap(2, 2, 0, 1);
hero = new Hero();
map = new RelativeMap(hero);
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
      integerUpdateState20milli = date.getMilliseconds();
    }
  }, refreshSpeed);
}());
