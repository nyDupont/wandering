class AbsoluteMap extends Map {
  constructor(i_max, j_max, i_init, j_init) {
    super();
    this.i_max = i_max;
    this.j_max = j_max;
    this.i = i_init;
    this.j = j_init;
    this.image = new Image();
    this.setImage();
  }

  draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // inutile puisqu'on redessine par dessus
    ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
  }

  setCoords(coords) {
    this.i = coords[0];
    this.j = coords[1];
    this.setImage();
  }

  setImage() {
    this.image.src = 'images/roads/road_'
                     + this.i.toString() + this.j.toString() + '.svg';
  }
}
