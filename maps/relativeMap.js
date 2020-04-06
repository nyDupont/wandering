class RelativeMap extends Map {
  constructor(relative) {
    super();
    this.relative = relative; // about who the map is center
    this.totalWidth = 2100;
    this.totalHeight = 1400;
    this.x;
    this.y;
    this.setPosition();

    this.name = 'test';
    this.image = new Image();
    this.setImage();

  }

  update() {
    this.setPosition();
    this.draw();
  }

  draw() {
    // console.log(this.image, this.x, this.y, this.totalWidth, this.totalHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(this.image, Math.round(this.x), Math.round(this.y), this.totalWidth, this.totalHeight)
    ctx.drawImage(this.image, Math.round(this.x), Math.round(this.y), this.totalWidth, this.totalHeight);
  }

  setPosition() {
    this.x = canvas.width/2 - this.relative.xCoord;
    this.y = canvas.height/2 - this.relative.yCoord;
    this.relative.x = canvas.width/2;
    this.relative.y = canvas.height/2;

    if (this.relative.xCoord < canvas.width/2) {
      this.x = 0;
      this.relative.x = this.relative.xCoord;
    } else if (this.relative.xCoord > this.totalWidth-canvas.width/2) {
      this.x = - this.totalWidth + canvas.width;
      this.relative.x = this.relative.xCoord - (this.totalWidth-canvas.width);
    }
    if (this.relative.yCoord < canvas.height/2) {
      this.y = 0;
      this.relative.y = this.relative.yCoord;
    } else if (this.relative.yCoord > this.totalHeight-canvas.height/2) {
      this.y = - this.totalHeight + canvas.height;
      this.relative.y = this.relative.yCoord - (this.totalHeight-canvas.height);
    }
  }
}
