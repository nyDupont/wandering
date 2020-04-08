class Map {
  constructor() {
    this.totalWidth = 2100;
    this.totalHeight = 1400;
    // this.setPosition();

    this.name = 'test';
    this.image = new Image();
    this.setImage();
  }

  setImage() {
    this.image.src = `images/maps/${this.name}.svg`
  }
}
