class ShurikenProjectile extends RotatingProjectile {
  constructor(owner, directionAngle) {
    super();
    this.owner = owner;
    this.x = this.owner.x;
    this.y = this.owner.y;
    this.directionAngle = directionAngle;
    this.speed = 15;
    this.size = 30;
    this.damage = 5;
    this.hitbox = new ProjectileHitbox(this, this.size, this.size, hero);

    this.imageSrcName = 'shuriken';
    this.setImage();
  }
}
