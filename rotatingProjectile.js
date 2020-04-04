class RotatingProjectile extends Projectile {
  constructor() {
    super();
    this.rotationAngle = 0;
    this.timeBeforeRotating;
    this.lastRotationTime;
  }

  // draw() {
  //   let newX = this.x;
  //   let newY = this.y;
  //   if (this.puslation != 0) {
  //     ctx.rotate(theta);
  //     newX = this.x*Math.cos(theta) + this.y*Math.sin(theta);
  //      newY = -this.x*Math.sin(theta) + this.y*Math.cos(theta);
  //   }
  //   ctx.drawImage(this.image,
  //                 Math.round(newX),
  //                 Math.round(newY),
  //                 Math.round(this.size), Math.round(this.size));
  //   if (this.pulsation != 0) {
  //     ctx.rotate(-theta);
  //   }
  // }
}
