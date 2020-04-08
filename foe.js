class Foe extends Belligerent {
  constructor() {
    super();
    this.maxHp = 20;
    this.hp = this.maxHp;
    this.timeBeforeHpHealing = 5; // seconds
    this.hpHealingSpeed = 0.1;

    // mana
    this.maxMana = 0;
    this.mana = this.maxMana;
    this.timeBeforeManaHealing = 3; // seconds
    this.manaHealingSpeed = 0.1;

    // situational
    this.randomlyPlace(hero, 400);
    this.direction = 'S';
    this.isMoving = false;

    // physical
    this.walkSpeed = 2;
    this.speed = this.walkSpeed;
    this.runSpeed = 3;
    this.normalSize = 100;
    this.size = this.normalSize;
    this.attackRange = 0.75*this.normalSize;
    this.seekRange = 300;

    // this.statBar = new StatBar(this, false);

    this.hitbox = new TargetHitbox(this, 0.75*this.size, 0.9*this.size);
    this.hitBoxDebug_fillStyleRGBa = 'rgba(0, 0, 255, 0.75)'

    this.nbOfAnimatedImages = 4;
    this.timeBetweenFrames = 100; // ms
    this.imageSrcName = 'foxes/fox';
    this.setImage(this.direction, this.animatedImageIndex);

  }

  update(date) {
    this.seek();
    this.setPosition();
    this.setPositionOnScreen();
    this.hitbox.update();
    // this.statBar.update();
    this.statRecOverTime();
    this.draw();
    if (this.isMoving && Math.abs(date.getMilliseconds()-this.lastFrameTime)
                         > this.timeBetweenFrames) {
      this.walkingAnimationUpdate();
      this.lastFrameTime = date.getMilliseconds();
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
    const dxToSource = source.x - this.x;
    const dyToSource = source.y - this.y;
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

      const lenPD = possibleDirection.length;
      angle = Math.round(lenPD*((angle+2*Math.PI)%(2*Math.PI))
                         /(2*Math.PI))%lenPD;
      this.direction = this.possibleDirection[angle];
      this.setDirection(this.direction);
    } else {
      this.isMoving = false;
    }
  }
}
