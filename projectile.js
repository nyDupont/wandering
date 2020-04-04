class Projectile {
  constructor() {
    this.x;
    this.y;
    this.speed;
    this.size;
    this.damage;
    this.knockBack;
    this.directionAngle;
    this.constructionTime = new Date();
    this.timeBeforeDestruction = 2; // seconds

    this.image = new Image();
    this.imageSrcName;

    this.source; // whose projectile it is, not to shoot oneself;
    this.hitbox;
    this.hitBoxDebug = false;
  }

  destruct() {
    listOfObjectsToUpdate.splice(listOfObjectsToUpdate.indexOf(this), 1);
    this.hitbox.destruct();
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
  }

  draw() {
    ctx.drawImage(this.image,
                  Math.round(this.x),
                  Math.round(this.y),
                  Math.round(this.size), Math.round(this.size));
    if (this.hitBoxDebug) {
      ctx.fillStyle = 'rgba(250, 0, 0, 0.5)';
      ctx.fillRect(Math.round(this.x-0.1*this.size/2),
                   Math.round(this.y-0.1*this.size/2),
                   Math.round(this.size), Math.round(this.size));
    }
  }

  setPosition() {
    this.x += this.speed * Math.cos(this.directionAngle);
    this.y += this.speed * Math.sin(this.directionAngle);
  }

  setImage() {
    this.image.src = 'images/' + this.imageSrcName + '.svg';
  }
}
