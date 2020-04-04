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
      // this.y = Math.random()*canvas.height;
      // this.x = Math.random()*canvas.width;
      this.y = canvas.height/2;
      this.x = canvas.width/8;
      this.direction = 'S';
      this.isMoving = false;
      // this.mapCoords = [0, 1];

      // physical
      this.walkSpeed = 3;
      this.speed = this.walkSpeed;
      // this.runSpeed = 10;
      this.normalSize = 100;
      this.size = this.normalSize;
      this.attackRange = 0.75*this.normalSize;
      this.seekRange = 300;

      this.statBar = new StatBar(this, false);
      this.fontHealthColor = '#aa2010';
      this.fontHpLoss = (0.3*this.size).toString() + 'px Arial';

      this.hitbox = new TargetHitbox(this, 0.75*this.size, 0.9*this.size);
      this.hitBoxDebug_fillStyleRGBa = 'rgba(0, 0, 255, 0.75)'

      this.nbOfAnimatedImages = 4;
      this.timeBetweenFrames = 100; // ms
      this.imageSrcName = 'fox';
      this.setImage(this.direction, this.animatedImageIndex);

    }

    update(date) {
      this.seek();
      this.setPosition();
      this.hitbox.update();
      this.statBar.update();
      this.statRecOverTime();
      this.draw();
      if (this.isMoving && Math.abs(date.getMilliseconds()-this.lastFrameTime)
                           > this.timeBetweenFrames) {
        this.walkingAnimationUpdate();
        this.lastFrameTime = date.getMilliseconds();
      }
    }

    seek() {
      const dyToHero = hero.y - this.y;
      let dxToHero = hero.x - this.x;
      const distanceToHero = Math.sqrt(Math.pow(dyToHero,2) + Math.pow(dxToHero,2));
      if (distanceToHero <= this.seekRange) { // only search if can see
        if (distanceToHero > this.attackRange) { // only search if can't reach
          this.isMoving = true;
        } else {
          this.isMoving = false;
        }
        if (dxToHero == 0) {
          dxToHero = 1;
        }
        let angle = Math.atan(dyToHero/dxToHero);
        if (dxToHero < 0) {
          angle += Math.PI;
        }
        angle = Math.round(4*((angle+2*Math.PI)%(2*Math.PI))/Math.PI)%8;
        this.direction = this.possibleDirection[angle];
        this.setDirection(this.direction);
      } else {
        this.isMoving = false;
      }
    }

}
