class ShurikenProjectile extends AnimatedProjectile {
  constructor(owner, directionAngle) {
    super();
    this.owner = owner;
    this.x = this.owner.x;
    this.y = this.owner.y;
    this.directionAngle = directionAngle;

    this.speed = 20;
    this.size = 30;
    this.damage = 2;
    this.knockBack = 3;

    this.hitbox = new ProjectileHitbox(this, this.size, this.size, this.owner);

    this.nbOfAnimatedImages = 3;
    this.timeBetweenFrames = 20; // ms
    this.imageSrcName = 'shurikens/shuriken';
    this.setImage();
  }
}
