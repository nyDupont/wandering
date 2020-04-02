class CoolDownDisplayer extends StateDisplayer {
    constructor(y, x, size) {
      super();
      this.y = y;
      this.x = x;
      this.size = size;
      this.image = new Image();
      this.setImage(0);
    }

    update(indexFloat) {
      this.setImage(indexFloat);
      this.draw();
    }

    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }

    setImage(indexFloat) {
      const nbOfImages = 8;
      let index;
      if (indexFloat == 0) {
        index = 0;
      } else {
        index = Math.floor(nbOfImages*indexFloat).toString();
      }
      this.image.src = 'images/cd_' + index + '.svg';
    }
}
