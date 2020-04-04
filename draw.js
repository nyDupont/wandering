const refreshSpeed = 0;

hero = new Hero();
map = new Map(2, 2, hero.mapCoords[0], hero.mapCoords[1]);
swirlStateDisplayer = new AbilityStateDisplayer('swirl', hero, 1);

foe = new Foe();

var integerUpdateState20milli = -20;

var listOfObjectsToUpdate = [map, hero, swirlStateDisplayer, foe];

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
