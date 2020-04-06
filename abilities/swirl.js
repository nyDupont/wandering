class Swirl extends Ability {
  constructor(owner) {
    super(owner);
    this.name = 'swirl';

    this.range = 300;
    this.manaCost = 2;
    this.isDashing = false;
    this.cd = 2; // seconds
    this.lastAbilityTime = new Date();
    this.lastAbilityTime.setSeconds(-this.cd);
    this.nbOfTurns = 3;
    this.nbOfFrames = 4*this.nbOfTurns;
    this.msBetweenFrames = 30;
    this.isDashing = false;

    this.abilityStateDisplayer = new AbilityStateDisplayer(this, 1);
  }

  swirl() {
    if (!this.isDashing && this.checkCD()) {
      const notOk2swirlN = map.i == 0 && this.owner.y < this.range;
      const notOk2swirlS = map.i == map.i_max && this.owner.y >= canvas.height-this.range;
      const notOk2swirlE = map.j == map.j_max && this.owner.x >= canvas.width-this.range;
      const notOk2swirlW = map.j == 0 && this.owner.x < this.range;

      if (this.owner.direction == 'N' && !notOk2swirlN) {
        // loseMana both test if hero has enought mana and if so makes him lose
        // the according amount.
          if (this.owner.loseMana(this.manaCost)) {
            this.swirlAnimation(this.owner.y-this.range, this.owner.x);
          }
      } else if (this.owner.direction == 'S' && !notOk2swirlS) {
          if (this.owner.loseMana(this.manaCost)) {
          this.swirlAnimation(this.owner.y+this.range, this.owner.x);
          }
      } else if (this.owner.direction == 'E' && !notOk2swirlE) {
          if (this.owner.loseMana(this.manaCost)) {
            this.swirlAnimation(this.owner.y, this.owner.x+this.range);
          }
      } else if (this.owner.direction == 'W' && !notOk2swirlW) {
          if (this.owner.loseMana(this.manaCost)) {
            this.swirlAnimation(this.owner.y, this.owner.x-this.range);
          }
      } else if (this.owner.direction == 'SE') {
          if (!notOk2swirlS && !notOk2swirlE) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y+this.range/Math.sqrt(2),
                                 this.owner.x+this.range/Math.sqrt(2));
            }
          } else if (!notOk2swirlS) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y+this.range/Math.sqrt(2), this.owner.x);
            }
          } else if (!notOk2swirlE) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y, this.owner.x+this.range/Math.sqrt(2));
            }
          }
      } else if (this.owner.direction == 'SW') {
          if (!notOk2swirlS && !notOk2swirlW) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y+this.range/Math.sqrt(2),
                                 this.owner.x-this.range/Math.sqrt(2));
            }
          } else if (!notOk2swirlS) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y+this.range/Math.sqrt(2), this.owner.x);
            }
          } else if (!notOk2swirlW) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y, this.owner.x-this.range/Math.sqrt(2));
            }
          }
      } else if (this.owner.direction == 'NE') {
          if (!notOk2swirlN && !notOk2swirlE) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y-this.range/Math.sqrt(2),
                                 this.owner.x+this.range/Math.sqrt(2));
            }
          } else if (!notOk2swirlN) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y-this.range/Math.sqrt(2), this.owner.x);
            }
          } else if (!notOk2swirlE) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y, this.owner.x+this.range/Math.sqrt(2));
            }
          }
      } else if (this.owner.direction == 'NW') {
          if (!notOk2swirlN && !notOk2swirlW) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y-this.range/Math.sqrt(2),
                                 this.owner.x-this.range/Math.sqrt(2));
            }
          } else if (!notOk2swirlN) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y-this.range/Math.sqrt(2), this.owner.x);
            }
          } else if (!notOk2swirlW) {
            if (this.owner.loseMana(this.manaCost)) {
              this.swirlAnimation(this.owner.y, this.owner.x-this.range/Math.sqrt(2));
            }
          }
        }
      }
    }

    async swirlAnimation(newY, newX) {
      this.isDashing = true;
      this.lastAbilityTime = new Date();
      let direction = this.owner.direction;
      for (var i=0; i<this.nbOfFrames; i++) {
        // console.log(i);
        if (i == Math.round(this.nbOfFrames/2)) {
          this.owner.x = newX;
          this.owner.y = newY;
        }
        this.owner.size = 2*this.owner.normalSize*Math.abs(i-this.nbOfFrames/2)
                     /this.nbOfFrames;
        direction = this.clockWiseDirectionPermutation(direction[this.owner.direction.length-1]);
        this.owner.setImage(direction, 0);
        this.owner.draw();
        await new Promise(r => setTimeout(r, this.msBetweenFrames));
        if (i == this.nbOfFrames - 1) {
          this.isDashing = false;
          this.owner.size = this.owner.normalSize;
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
