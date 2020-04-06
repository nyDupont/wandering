class Map {
  constructor() {
    this.name;
    this.image;

    listOfObjectsToUpdate.unshift(this);
  }

  update() {
    this.draw();
  }

  draw() {
  }

  setImage() {
    this.image.src = `images/maps/${this.name}.svg`
  }
}
