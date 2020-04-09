class Hitbox {
  constructor(owner, width, height) {
    this.owner = owner;
    this.xCoord = this.owner.xCoord;
    this.yCoord = this.owner.yCoord;
    this.width = width; // different from owner.size because images are badly croped
    this.height = height;
  }

  update() {
    this.xCoord = this.owner.xCoord; // for the hitbox to follow its owner
    this.yCoord = this.owner.yCoord;
    // this.collides();
  }
}
