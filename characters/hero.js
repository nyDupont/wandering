class Hero extends Belligerent {
  constructor(x, y) {
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
    this.xCoord = x; // on map
    this.yCoord = y;
    this.direction = 'S';
    this.isMoving = false;

    // physical
    this.walkSpeed = 7;
    this.runSpeed = 10;
    this.speed = this.walkSpeed;
    this.normalSize = 100;
    this.size = this.normalSize;

    // this.mire = new Mire(this);
    // this.statBar = new StatBar(this, true);

    this.hitbox = new TargetHitbox(this, 0.75*this.size, 0.9*this.size);
    this.hitBoxDebug_fillStyleRGBa = 'rgba(0, 255, 0, 0.75)';

    this.nbOfAnimatedImages = 4;
    this.timeBetweenFrames = 100; // ms
    this.imageSrcName = 'foxes/fox';
    this.setImage(this.direction, this.animatedImageIndex);
    // abilities
    // this.swirl = new Swirl(this);
    // this.abilities = [this.swirl];
    this.envelopesBank = 10;
  }

  update(date) {
    this.setPosition();
    fov.update(date);
    this.hitbox.update();
    // this.statBar.update();
    // for (let ability of this.abilities) {
      // ability.update();
    // }
    // this.mire.update();
    // this.checkMap();
    this.statRecOverTime();
    if (this.isMoving && Math.abs(date.getMilliseconds()-this.lastFrameTime)
                         > this.timeBetweenFrames) {
      this.walkingAnimationUpdate();
      this.lastFrameTime = date.getMilliseconds();
    }
  }

  checkAbsoluteMap() {
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

  sendEnvelope(angle) {
    if (this.envelopesBank > 0) {
      let envelope = new EnvelopeProjectile(this, angle);
      this.envelopesBank --;
      // console.log(this.envelopesBank);
    }

  }
}
