function Hero() {
  // Attributes:
  this.maxHp = 100;
  this.timeBeforeHpHealing = 2; // seconds
  this.hpHealingSpeed = 1;
  this.maxMana = 30;
  this.timeBeforeManaHealing = 3; // seconds
  this.manaHealingSpeed = 0.5;
  this.walkSpeed = 8;
  this.sprintSpeed = 8;
  this.dashRange = 200;
  this.normalSize = 100;

  // presentAttributes:
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.size = this.normalSize;
  this.hp = this.maxHp;
  this.mana = this.maxMana;
  this.lastHpLossTime;
  this.lastManaLossTime;
  this.speed = this.walkSpeed;
  this.isMoving = false;
  this.direction = 'S';
  this.image = new Image();
  this.animatedImageIndex = 0;
  this.image.src = 'images/fox_' + this.direction[this.direction.length-1] +
                   '_' + this.animatedImageIndex.toString() + '.svg';

  this.update = function() {
    this.setPosition();
    this.statRecover();
    this.draw();
  };

  this.draw = function() {
    // console.log(this.isMoving);
    ctx.drawImage(this.image,
                  Math.round(this.x-this.size/2), Math.round(this.y-this.size/2),
                  Math.round(this.size), Math.round(this.size));
    // if (this.isMoving) {
    //   this.walkingAnimationUpdate()
    // }
  };

  this.setDirection = function(direction) {
    this.direction = direction;
    // console.log(this.direction);
    this.setImage(this.direction, this.animatedImageIndex);
  };

  this.setImage = function(direction, animatedImageIndex) {
    // console.log(this.direction, this.animatedImageIndex);
    this.image.src = 'images/fox_' + direction[direction.length-1] +
                     '_' + animatedImageIndex.toString() + '.svg';
  };

  this.walkingAnimationUpdate = function() {
    if (this.isMoving) {
      this.animatedImageIndex = (this.animatedImageIndex+1)%4;
      this.setImage(this.direction, this.animatedImageIndex);
    }
  };

  this.setMotionState = function(state) {
    if (state == 'moving') {
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
  };

  this.setPosition = function() {
    if (this.isMoving) {
      const ok2goN = map.i >= 0 && this.y >= 0;
      const ok2goS = map.i <= map.i_max && this.y < canvas.height;
      const ok2goE = map.j <= map.j_max && this.x < canvas.width;
      const ok2goW = map.j >= 0 && this.x >= 0;
      switch(this.direction) {
        case 'N':
          if (ok2goN) {
            this.y -= this.speed;
          };
          break;
        case 'S':
          if (ok2goS) {
            this.y += this.speed;
          };
          break;
        case 'W':
          if (ok2goW) {
            this.x -= this.speed;
          };
          break;
        case 'E':
          if (ok2goE) {
            this.x += this.speed;
          };
          break;
        case 'NW':
          if (ok2goN) {
            this.y -= this.speed/Math.sqrt(2);
          };
          if (ok2goW) {
            this.x -= this.speed/Math.sqrt(2);
          };
          break;
        case 'NE':
          if (ok2goN) {
            this.y -= this.speed/Math.sqrt(2);
          };
          if (ok2goE) {
            this.x += this.speed/Math.sqrt(2);
          };
          break;
        case 'SW':
          if (ok2goS) {
            this.y += this.speed/Math.sqrt(2);
          };
          if (ok2goW) {
            this.x -= this.speed/Math.sqrt(2);
          };
          break;
        case 'SE':
          if (ok2goS) {
            this.y += this.speed/Math.sqrt(2);
          };
          if (ok2goE) {
            this.x += this.speed/Math.sqrt(2);
          };
          break;
      }
    }
    if (this.x >= canvas.width && map.j < map.j_max) {
      this.x = 0;
      map.setCoords(map.i, map.j+1);
    }
    if (this.x < 0 && map.j > 0) {
      this.x = canvas.width-1;
      map.setCoords(map.i, map.j-1);
    }
    if (this.y >= canvas.height && map.i < map.i_max) {
      this.y = 0;
      map.setCoords(map.i+1, map.j);
    }
    if (this.y < 0 && map.i > 0) {
      this.y = canvas.height-1;
      map.setCoords(map.i-1, map.j);
    }
    // this.x = Math.round(this.x);
    // this.y = Math.round(this.y);
  }

  this.loseHp = function(hpLoss) {
    this.lastHpLossTime = new Date()
    if (this.hp < hpLoss) {
      this.hp = 0;
    } else {
      this.hp -= hpLoss;
    };
  }

  this.loseMana = function(manaLoss) {
    if (this.mana >= manaLoss) {
      this.lastManaLossTime = new Date();
      this.mana -= manaLoss;
      return true;
    }  else {
      return false;
    };
  }

  this.statRecover = function() {
    if (this.hp < this.maxHp) {
      let d1 = new Date();
      d1 = d1.getMinutes()*60+d1.getSeconds();
      d2 = this.lastHpLossTime.getMinutes()*60+this.lastHpLossTime.getSeconds();
      if (Math.abs(d1-d2) > this.timeBeforeHpHealing) {
        this.hp += this.hpHealingSpeed;
      }
    };

    if (this.mana < this.maxMana) {
      let d1 = new Date();
      d1 = d1.getMinutes()*60+d1.getSeconds();
      d2 = this.lastManaLossTime.getMinutes()*60+this.lastManaLossTime.getSeconds();
      if (Math.abs(d1-d2) > this.timeBeforeManaHealing) {
        this.mana += this.manaHealingSpeed;
      }
    };
  }


  this.sprintOn = function() {
    this.speed = this.sprintSpeed;
  }

  this.sprintOff = function() {
    this.speed = this.walkSpeed;
  }

  this.dash = function() {
    const dashManaCost = 10;
    const msBetweenFrames = 30;
    const notOk2dashN = map.i == 0 && this.y < this.dashRange;
    const notOk2dashS = map.i == map.i_max && this.y >= canvas.height-this.dashRange;
    const notOk2dashE = map.j == map.j_max && this.x >= canvas.width-this.dashRange;
    const notOk2dashW = map.j == 0 && this.x < this.dashRange;

    if (this.direction == 'N' && !notOk2dashN) {
      // loseMana both test if hero has enought mana and if so makes him lose
      // the according amount.
        if (this.loseMana(dashManaCost)) {
          this.dashAnimation(this.y-this.dashRange, this.x, msBetweenFrames);
        }
    } else if (this.direction == 'S' && !notOk2dashS) {
        if (this.loseMana(dashManaCost)) {
        this.dashAnimation(this.y+this.dashRange, this.x, msBetweenFrames);
        }
    } else if (this.direction == 'E' && !notOk2dashE) {
        if (this.loseMana(dashManaCost)) {
          this.dashAnimation(this.y, this.x+this.dashRange, msBetweenFrames);
        }
    } else if (this.direction == 'W' && !notOk2dashW) {
        if (this.loseMana(dashManaCost)) {
          this.dashAnimation(this.y, this.x-this.dashRange, msBetweenFrames);
        }
    } else if (this.direction == 'SE') {
        if (!notOk2dashS && !notOk2dashE) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y+this.dashRange/Math.sqrt(2),
                               this.x+this.dashRange/Math.sqrt(2), msBetweenFrames);
          }
        } else if (!notOk2dashS) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y+this.dashRange/Math.sqrt(2), this.x,
                               msBetweenFrames);
          }
        } else if (!notOk2dashE) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y, this.x+this.dashRange/Math.sqrt(2),
                               msBetweenFrames);
          }
        }
    } else if (this.direction == 'SW') {
        if (!notOk2dashS && !notOk2dashW) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y+this.dashRange/Math.sqrt(2),
                               this.x-this.dashRange/Math.sqrt(2), msBetweenFrames);
          }
        } else if (!notOk2dashS) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y+this.dashRange/Math.sqrt(2), this.x,
                               msBetweenFrames);
          }
        } else if (!notOk2dashW) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y, this.x-this.dashRange/Math.sqrt(2),
                               msBetweenFrames);
          }
        }
    } else if (this.direction == 'NE') {
        if (!notOk2dashN && !notOk2dashE) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y-this.dashRange/Math.sqrt(2),
                               this.x+this.dashRange/Math.sqrt(2), msBetweenFrames);
          }
        } else if (!notOk2dashN) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y-this.dashRange/Math.sqrt(2), this.x,
                               msBetweenFrames);
          }
        } else if (!notOk2dashE) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y, this.x+this.dashRange/Math.sqrt(2),
                               msBetweenFrames);
          }
        }
    } else if (this.direction == 'NW') {
        if (!notOk2dashN && !notOk2dashW) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y-this.dashRange/Math.sqrt(2),
                               this.x-this.dashRange/Math.sqrt(2), msBetweenFrames);
          }
        } else if (!notOk2dashN) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y-this.dashRange/Math.sqrt(2), this.x,
                               msBetweenFrames);
          }
        } else if (!notOk2dashW) {
          if (this.loseMana(dashManaCost)) {
            this.dashAnimation(this.y, this.x-this.dashRange/Math.sqrt(2),
                               msBetweenFrames);
          }
        }
    }
  }

  this.dashAnimation = async function(newY, newX, msBetweenFrames) {
    let direction = this.direction;
    const nbOfFrames = 12;
    for (var i=0; i<nbOfFrames; i++) {
      if (i == Math.round(nbOfFrames/2)) {
        this.x = newX;
        this.y = newY;
      };
      this.size = this.normalSize*Math.abs(i-nbOfFrames/2)*2/nbOfFrames;
      direction = clockWiseDirectionPermutation(direction[this.direction.length-1]);
      this.setImage(direction, 0);
      this.draw();
      await new Promise(r => setTimeout(r, msBetweenFrames));
    };
  }
  // this.randomizeColor = function () {
  //   this.color = '#' + Math.round(Math.random()*Math.pow(16, 6)).toString(16);
  // }

  // this.eat = function(fruit) {
  //   if (this.x === fruit.x && this.y === fruit.y) {
  //     this.total ++;
  //     return true;
  //   }
  //   return false;
  // }
}


function clockWiseDirectionPermutation(direction) {
  const clockWiseCardinals = ['N', 'E', 'S', 'W'];
  return clockWiseCardinals[(clockWiseCardinals.indexOf(direction)+1)%
                            clockWiseCardinals.length];
}
