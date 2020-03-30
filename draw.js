const refreshSpeed = 0;
map = new Map(2, 2, 1, 0);
hero = new Hero();
var integerUpdateState50milli;
var integerUpdateState100milli;

(function setup() {
  window.setInterval(() => {
    var d1 = new Date();
    if (Math.floor(d1.getMilliseconds()/50) != integerUpdateState50milli) {
      map.draw()
      hero.setPosition();
      if (Math.floor(d1.getMilliseconds()/100) != integerUpdateState100milli) {
        hero.draw(1);
        integerUpdateState100milli = Math.floor(d1.getMilliseconds()/100);
      } else {
        hero.draw(0);
        integerUpdateState100milli = Math.floor(d1.getMilliseconds()/100);
      }
      integerUpdateState = Math.floor(d1.getMilliseconds()/50);
    };
  }, refreshSpeed);
}());
