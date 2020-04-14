class FoeBook extends Foe {
  constructor() {
    super();
    // health
    this.maxHp = 20;
    this.hp = this.maxHp;
    this.timeBeforeHpHealing = 5; // seconds
    this.hpHealingSpeed = 0.1;

    // mana
    this.maxMana = 0;

    // situational
    this.randomlyPlace(hero, 400);
    this.direction = 'S';

    // physical
    this.walkSpeed = 2;
    this.speed = this.walkSpeed;
    this.runSpeed = 3;
    this.normalSize = 50;
    this.size = this.normalSize;
    this.attackRange = 0.75*this.normalSize;
    this.seekRange = 300;

    this.nbOfAnimatedImages = 4;
    this.timeBetweenFrames = 120;
    this.spriteWidth = 280;
    this.spriteHeight = 360;
    this.imageSrcName = 'book/book'
    this.setImage(this.direction, this.animatedImageIndex);

    // this.hitbox = new TargetHitbox(this, 0.75*this.size, 0.9*this.size);
  }
}
