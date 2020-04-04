const refreshSpeed = 0;

hero = new Hero();
map = new Map(2, 2, hero.mapCoords[0], hero.mapCoords[1]);
mainMire = new Mire(hero);
swirlStateDisplayer = new AbilityStateDisplayer('swirl', hero, 1);

foe = new Foe();

var integerUpdateState20milli = -20;
var integerUpdateState100milli = -100;
var integerUpdateState2sec = -2;

var listOfObjectsToUpdate = [map, hero,
                             swirlStateDisplayer, foe];



(function setup() {
  window.setInterval(() => {
    var d1 = new Date();
    if (Math.abs(integerUpdateState20milli - d1.getMilliseconds()) > 20) {
      // console.log(listOfObjectsToUpdate);
      for (let i of listOfObjectsToUpdate) {
      //   if (typeof i.timeBeforeDestruction !== "undefined") {
      //     if (Math.abs(d1.getSeconds() - i.constructionTime.getSeconds()) > i.timeBeforeDestruction) {
      //                 listOfObjectsToUpdate.splice(listOfObjectsToUpdate.indexOf(i), 1);
      //     }
      //   }
        i.update();
      }
      integerUpdateState20milli = d1.getMilliseconds();
    }
    if (Math.abs(integerUpdateState100milli - d1.getMilliseconds()) > 100) {
      hero.walkingAnimationUpdate();
      foe.walkingAnimationUpdate();
      integerUpdateState100milli = d1.getMilliseconds();
    }
    if (Math.abs(integerUpdateState2sec - d1.getSeconds()) > 2) {
      // console.log(listOfObjectsToUpdate.length.toString() + ' existing objects');
      // console.log(listOfTargetHitbox.length.toString() + ' target hitbox')
      // console.log(listOfProjectileHitbox.length.toString() + ' projectile hitbox')
      integerUpdateState2sec = d1.getSeconds();
    }
  }, refreshSpeed);
}());
