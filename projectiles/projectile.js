class Projectile {
  constructor() {
    this.owner; // whose projectile it is, not to shoot oneself;
    this.xCoord;
    this.yCoord;
    this.speed;
    this.size;
    this.damage;
    this.knockBack;
    this.directionAngle;
    this.constructionTime = new Date();
    this.timeBeforeDestruction = 2; // seconds

    this.image = new Image();
    this.imageSrcName;

    this.hitbox;
    this.hitBoxDebug = false;

    listOfObjectsToUpdate.push(this);
    listOfObjectsToDraw.push(this);
  }

  destruct() {
    listOfObjectsToUpdate.splice(listOfObjectsToUpdate.indexOf(this), 1);
    listOfObjectsToDraw.splice(listOfObjectsToDraw.indexOf(this), 1);
    this.hitbox.destruct();
  }

  update(date) {
    this.hitbox.update();
    if (this.hitbox.collides()) {
      this.hitbox.hitTarget.loseHp(this.damage, this.owner);
      this.hitbox.hitTarget.knockBack(this.directionAngle, this.knockBack);
      this.destruct();
    }

    if (Math.abs(date.getSeconds() - this.constructionTime.getSeconds())
        > this.timeBeforeDestruction) {
      this.destruct();
      // console.log('popped');
    }
    this.setPosition();
  }

  // computeRelativeSpeed() { // removed as it should be done vectorially
  //   if (this.owner.isMoving) {
  //     this.speed += this.owner.speed;
  //   }
  // }

  setPosition() {
    this.xCoord += this.speed * Math.cos(this.directionAngle);
    this.yCoord += this.speed * Math.sin(this.directionAngle);
  }

  setImage() {
    this.image.src = 'images/' + this.imageSrcName + '.svg';
  }
}
