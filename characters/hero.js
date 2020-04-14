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

    // physical
    this.walkSpeed = 8;
    this.runSpeed = 12;
    this.speed = this.walkSpeed;
    this.normalSize = 120;
    this.size = this.normalSize;

    // this.mire = new Mire(this);
    this.statBar = new StatBar(this, true);

    this.hitbox = new TargetHitbox(this, 0.75*this.size, 0.9*this.size);
    this.hitBoxDebug_fillStyleRGBa = 'rgba(0, 255, 0, 0.75)';

    this.nbOfAnimatedImages = 8;
    // this.timeBetweenFrames = 3*this.size/this.speed; // ms
    this.timeBetweenFrames = 75;
    this.spriteWidth = 280;
    this.spriteHeight = 360;
    // this.imageSrcName = 'foxes/fox';
    this.imageSrcName = 'ducks/mailmanDuck'
    // this.setImage(this.direction, this.animatedImageIndex);
    this.setImage();
    // abilities
    // this.swirl = new Swirl(this);
    // this.abilities = [this.swirl];
    this.envelopesBank = 10;

    // this.walkingDustEffect = new WalkingDustEffect(this);
  }

  update(date) {
    this.setPosition();
    this.hitbox.update();
    fov.update(date);
    // this.statBar.update();
    // for (let ability of this.abilities) {
      // ability.update();
    // }
    // this.mire.update();
    // this.checkMap();
    this.statRecOverTime();
    // this.walkingAnimationUpdate(date);
    this.animationUpdate(date);
    // fov.clipDraw(this, this.spriteWidth*this.animatedImageIndex, 0,
    //              this.spriteWidth, this.spriteHeight);

    // if (this.isMoving) {
    //   this.walkingDustEffect.update(date);
    // }
    fov.clipDraw(this, this.animatedImageIndex*this.spriteWidth, 0,
                 this.spriteWidth, this.spriteHeight);
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
