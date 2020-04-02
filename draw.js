const refreshSpeed = 0;
map = new Map(2, 2, 1, 0);
hero = new Hero();
// hero2 = new Hero()
mainStatBar = new StatBar(hero, true);
swirlStateDisplayer = new AbilityStateDisplayer('swirl', hero, 1);
// statBar2 = new StatBar(hero2, false);
// var integerUpdateState10milli = 100;
var integerUpdateState20milli = -20;
var integerUpdateState100milli = -20;

(function setup() {
  window.setInterval(() => {
    var d1 = new Date();
    // console.log(d1.getMilliseconds()-integerUpdateState10milli);
    // if (Math.abs(integerUpdateState10milli - d1.getMilliseconds()) > 20) {
    //   hero.setPosition();
    //   integerUpdateState10milli = d1.getMilliseconds();
    //   // console.log(integerUpdateState10milli);
    // };
    if (Math.abs(integerUpdateState20milli - d1.getMilliseconds()) > 20) {
      // console.log('yo');
      map.draw(); // drawn first as it clears the canvas
      hero.update();
      // hero2.update();
      mainStatBar.draw();
      swirlStateDisplayer.update();
      // statBar2.draw();
      integerUpdateState20milli = d1.getMilliseconds();
    };
    if (Math.abs(integerUpdateState100milli - d1.getMilliseconds()) > 100) {
      hero.walkingAnimationUpdate();
      integerUpdateState100milli = d1.getMilliseconds();
    };
    // if (Math.floor(d1.getMilliseconds()/50) == integerUpdateState50milli) {
    //   map.draw()
    //   hero.setPosition();
    //   hero.draw();
    //   integerUpdateState50milli = (Math.floor(d1.getMilliseconds()/50+1)%20);
    // }
    // if (Math.floor(d1.getMilliseconds()/100) == integerUpdateState100milli) {
    //   // console.log(integerUpdateState100milli);
    //   hero.walkingAnimationUpdate();
    //   integerUpdateState100milli = (Math.floor(d1.getMilliseconds()/100)+1)%10;
    //   // console.log(integerUpdateState100milli);
    // }
  }, refreshSpeed);
}());
