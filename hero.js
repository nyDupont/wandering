class Hero extends Belligerent {
  constructor() {
    super();
    // health
    this.maxHp = 50;
    this.hp = this.maxHp;
    this.timeBeforeHpHealing = 2; // seconds
    this.hpHealingSpeed = 0.2;

    // mana
    this.maxMana = 10;
    this.mana = this.maxMana;
    this.timeBeforeManaHealing = 3; // seconds
    this.manaHealingSpeed = 0.1;

    // situational
    this.y = canvas.height/2;
    this.x = 7*canvas.width/8;
    this.direction = 'S';
    this.isMoving = false;
    this.mapCoords = [0, 1];

    // physical
    this.walkSpeed = 8;
    this.runSpeed = 10;
    this.speed = this.walkSpeed;
    this.normalSize = 100;
    this.size = this.normalSize;
    this.imageSrcName = 'fox';
    this.setImage(this.direction, this.animatedImageIndex);

    this.statBar = new StatBar(this, true);

    this.hitbox = new TargetHitbox(this, 0.75*this.size, 0.9*this.size);
    this.hitBoxDebug_fillStyleRGBa = 'rgba(0, 255, 0, 0.75)';

    // abilities attributes
    this.swirlRange = 300;
    this.swirlManaCost = 2;
    this.isDashing = false;
    this.swirlCD = 2; // seconds
    this.lastSwirlTime = new Date();
    this.lastSwirlTime.setSeconds(-this.swirlCD);
  }

  update() {
    this.setPosition();
    this.hitbox.update();
    this.statBar.update();
    this.checkMap();
    this.statRecOverTime();
    this.draw();
  }

  checkMap() {
    if (this.x >= canvas.width && map.j < map.j_max) {
      this.x = 0;
      this.mapCoords = [this.mapCoords[0], this.mapCoords[1]+1];
      map.setCoords(this.mapCoords);
    }
    if (this.x < 0 && map.j > 0) {
      this.x = canvas.width-1;
      this.mapCoords = [this.mapCoords[0], this.mapCoords[1]-1];
      map.setCoords(this.mapCoords);
    }
    if (this.y >= canvas.height && map.i < map.i_max) {
      this.y = 0;
      this.mapCoords = [this.mapCoords[0]+1, this.mapCoords[1]];
      map.setCoords(this.mapCoords);
    }
    if (this.y < 0 && map.i > 0) {
      this.y = canvas.height-1;
      this.mapCoords = [this.mapCoords[0]-1, this.mapCoords[1]];
      map.setCoords(this.mapCoords);
    }
  }

  checkCD(abilityCD, lastAbilityTime) {
    let d1 = new Date();
    d1 = d1.getMinutes()*60 + d1.getSeconds();
    let d2 = lastAbilityTime.getMinutes()*60 + lastAbilityTime.getSeconds();
    if (Math.abs(d1-d2) >= abilityCD) {
      return true;
    } else {
      return false;
    }
  }

  swirl() {
    if (this.checkCD(this.swirlCD, this.lastSwirlTime)) {
      const msBetweenFrames = 30;
      const notOk2swirlN = map.i == 0 && this.y < this.swirlRange;
      const notOk2swirlS = map.i == map.i_max && this.y >= canvas.height-this.swirlRange;
      const notOk2swirlE = map.j == map.j_max && this.x >= canvas.width-this.swirlRange;
      const notOk2swirlW = map.j == 0 && this.x < this.swirlRange;

      if (this.direction == 'N' && !notOk2swirlN) {
        // loseMana both test if hero has enought mana and if so makes him lose
        // the according amount.
          if (this.loseMana(this.swirlManaCost)) {
            this.swirlAnimation(this.y-this.swirlRange, this.x, msBetweenFrames);
          }
      } else if (this.direction == 'S' && !notOk2swirlS) {
          if (this.loseMana(this.swirlManaCost)) {
          this.swirlAnimation(this.y+this.swirlRange, this.x, msBetweenFrames);
          }
      } else if (this.direction == 'E' && !notOk2swirlE) {
          if (this.loseMana(this.swirlManaCost)) {
            this.swirlAnimation(this.y, this.x+this.swirlRange, msBetweenFrames);
          }
      } else if (this.direction == 'W' && !notOk2swirlW) {
          if (this.loseMana(this.swirlManaCost)) {
            this.swirlAnimation(this.y, this.x-this.swirlRange, msBetweenFrames);
          }
      } else if (this.direction == 'SE') {
          if (!notOk2swirlS && !notOk2swirlE) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y+this.swirlRange/Math.sqrt(2),
                                 this.x+this.swirlRange/Math.sqrt(2), msBetweenFrames);
            }
          } else if (!notOk2swirlS) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y+this.swirlRange/Math.sqrt(2), this.x,
                                 msBetweenFrames);
            }
          } else if (!notOk2swirlE) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y, this.x+this.swirlRange/Math.sqrt(2),
                                 msBetweenFrames);
            }
          }
      } else if (this.direction == 'SW') {
          if (!notOk2swirlS && !notOk2swirlW) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y+this.swirlRange/Math.sqrt(2),
                                 this.x-this.swirlRange/Math.sqrt(2), msBetweenFrames);
            }
          } else if (!notOk2swirlS) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y+this.swirlRange/Math.sqrt(2), this.x,
                                 msBetweenFrames);
            }
          } else if (!notOk2swirlW) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y, this.x-this.swirlRange/Math.sqrt(2),
                                 msBetweenFrames);
            }
          }
      } else if (this.direction == 'NE') {
          if (!notOk2swirlN && !notOk2swirlE) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y-this.swirlRange/Math.sqrt(2),
                                 this.x+this.swirlRange/Math.sqrt(2), msBetweenFrames);
            }
          } else if (!notOk2swirlN) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y-this.swirlRange/Math.sqrt(2), this.x,
                                 msBetweenFrames);
            }
          } else if (!notOk2swirlE) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y, this.x+this.swirlRange/Math.sqrt(2),
                                 msBetweenFrames);
            }
          }
      } else if (this.direction == 'NW') {
          if (!notOk2swirlN && !notOk2swirlW) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y-this.swirlRange/Math.sqrt(2),
                                 this.x-this.swirlRange/Math.sqrt(2), msBetweenFrames);
            }
          } else if (!notOk2swirlN) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y-this.swirlRange/Math.sqrt(2), this.x,
                                 msBetweenFrames);
            }
          } else if (!notOk2swirlW) {
            if (this.loseMana(this.swirlManaCost)) {
              this.swirlAnimation(this.y, this.x-this.swirlRange/Math.sqrt(2),
                                 msBetweenFrames);
            }
          }
        }
      }
    }

    async swirlAnimation(newY, newX, msBetweenFrames) {
      this.isDashing = true;
      this.lastSwirlTime = new Date();
      let direction = this.direction;
      const nbOfFrames = 12;
      for (var i=0; i<nbOfFrames; i++) {
        if (i == Math.round(nbOfFrames/2)) {
          this.x = newX;
          this.y = newY;
        }
        this.size = this.normalSize*Math.abs(i-nbOfFrames/2)*2/nbOfFrames;
        direction = this.clockWiseDirectionPermutation(direction[this.direction.length-1]);
        this.setImage(direction, 0);
        this.draw();
        await new Promise(r => setTimeout(r, msBetweenFrames));
        if (i == nbOfFrames - 1) {
          this.isDashing = false;
          this.size = this.normalSize;
        }
      }
  }

  clockWiseDirectionPermutation(direction) {
    // should it better be defined outside hero class definition?
    const clockWiseCardinals = ['N', 'E', 'S', 'W'];
    return clockWiseCardinals[(clockWiseCardinals.indexOf(direction)+1)%
                              clockWiseCardinals.length];
  }
}
