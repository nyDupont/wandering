class DustEffect extends Effect {
  constructor(xCoord, yCoord, delay) {
    super(xCoord, yCoord);
    this.name = 'dust_effect';
    this.size = 30;
    this.spriteWidth = 20;
    this.spriteHeight = 20;
    this.nbOfAnimatedImages = 8;
    this.timeBetweenFrames = 30; // ms

    this.constructTime = new Date();
    this.constructTime = this.constructTime.getSeconds()*1000
                         + this.constructTime.getMilliseconds();
    this.delay = delay; // ms

    this.setImage();
  }

  update(date) {
    if (Math.abs((date.getSeconds()*1000 + date.getMilliseconds())
                 - this.constructTime) > this.delay) {
      this.animationUpdate(date);
      fov.clipDraw(this, this.spriteWidth*this.animatedImageIndex, 0,
                   this.spriteWidth, this.spriteHeight);
    }
    if (this.animatedImageIndex == this.nbOfAnimatedImages - 1) {
      this.destruct();
    }
  }
}
