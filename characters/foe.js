class Foe extends Belligerent {
  constructor() {
    super();
    // this.statBar = new StatBar(this, false);
    this.hitBoxDebug_fillStyleRGBa = 'rgba(0, 0, 255, 0.75)'

    this.walkingDustEffect = new WalkingDustEffect(this);
  }

  update(date) {
    this.seek();
    this.setPosition();
    // this.hitbox.update();
    // this.statBar.update();
    this.statRecOverTime();
    this.animationUpdate(date);
    fov.clipDraw(this, this.animatedImageIndex*this.spriteWidth, 0,
                 this.spriteWidth, this.spriteHeight);
    if (this.isMoving) {
      this.walkingDustEffect.update(date);
    }
  }

  randomlyPlace(relative, distance) {
    const angle = Math.random()*2*Math.PI;
    this.xCoord = relative.xCoord + distance*Math.cos(angle);
    this.yCoord = relative.yCoord + distance*Math.sin(angle);
  }

  loseHp(hpLoss, source) {
    this.lastHpLossTime = new Date();
    this.loseHpAnimation(hpLoss);
    if (this.hp <= hpLoss) {
      this.hp = 0;
      this.death();
    } else {
      this.hp -= hpLoss;
    }
    const dxToSource = source.xCoord - this.xCoord;
    const dyToSource = source.yCoord - this.yCoord;
    const distanceToSource = Math.sqrt(Math.pow(dyToSource, 2) + Math.pow(dxToSource,2));
    this.seekRange = distanceToSource + 100;
  }

  seek() {
    let dxToHero = hero.xCoord - this.xCoord;
    const dyToHero = hero.yCoord - this.yCoord;
    const distanceToHero = Math.sqrt(Math.pow(dyToHero,2) + Math.pow(dxToHero,2));
    if (distanceToHero <= this.seekRange) { // only search if can see
      if (distanceToHero > this.attackRange) { // only search if can't reach
        this.isMoving = true;
      } else {
        this.isMoving = false;
      }
      if (dxToHero == 0) {
        dxToHero = 1; // handling dividing by zero in atan
      }
      let angle = Math.atan(dyToHero/dxToHero);
      if (dxToHero < 0) {
        angle += Math.PI; // handling atan 'degenerately' defined
      }

      const lenPD = this.possibleDirection.length;
      angle = Math.round(lenPD*((angle+2*Math.PI)%(2*Math.PI))
                         /(2*Math.PI))%lenPD;
      this.direction = this.possibleDirection[angle];
      this.setDirection(this.direction);
    } else {
      this.isMoving = false;
    }
  }

  setImage() {
    // this.image.src = 'images/' + this.imageSrcName + '_' + this.animationSate
    //                  + '_' + direction[direction.length-1] + '.svg';
    this.image.src = 'images/characters/foes/' + this.imageSrcName + '_' + this.animationState
                     + '_SW.svg';
  }
}
