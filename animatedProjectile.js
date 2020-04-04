class AnimatedProjectile extends Projectile {
  constructor() {
    super();
    this.animatedImageIndex = 0;
    this.nbOfAnimatedImages;
    this.timeBetweenFrames;
    this.lastFrameTime = new Date().getMilliseconds();
  }

  update(date) {
    this.hitbox.update();
    if (this.hitbox.collides()) {
      this.hitbox.hitTarget.loseHp(this.damage);
      this.hitbox.hitTarget.knockBack(this.directionAngle, this.knockBack);
      this.destruct();
    }

    if (Math.abs(date.getSeconds() - this.constructionTime.getSeconds())
        > this.timeBeforeDestruction) {
      this.destruct();
      // console.log('popped');
    }
    this.setPosition();
    this.draw();
    if (Math.abs(date.getMilliseconds()-this.lastFrameTime) > this.timeBetweenFrames) {
      this.animationUpdate();
      this.lastFrameTime = date.getMilliseconds();
    }
  }

  animationUpdate() {
      this.animatedImageIndex = (this.animatedImageIndex+1)
                                %this.nbOfAnimatedImages;
      this.setImage();
  }

  setImage() {
    this.image.src = 'images/' + this.imageSrcName + '_'
                     + this.animatedImageIndex + '.svg';
  }
}
