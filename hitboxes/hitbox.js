class Hitbox {
  constructor(owner, width, height) {
    this.owner = owner;
    this.x = this.owner.x;
    this.y = this.owner.y;
    this.width = width; // different from owner.size because images are badly croped
    this.height = height;
  }

  update() {
    this.x = this.owner.x; // for the hitbox to follow its owner
    this.y = this.owner.y;
    // this.collides();
  }
}
