class Effect {
  constructor(xCoord, yCoord) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.size;

    this.name;
    this.image = new Image();
    this.animatedImageIndex = 0;
    this.timeBetweenFrames;
    this.lastFrameTime = new Date()
    this.lastFrameTime = this.lastFrameTime.getSeconds()*1000
                         + this.lastFrameTime.getMilliseconds();

    listOfObjectsToUpdate.push(this);
  }

  destruct() {
    listOfObjectsToUpdate.splice(listOfObjectsToUpdate.indexOf(this), 1);
  }

  update(date) {
    this.animationUpdate(date);
    fov.clipDraw(this, this.size*this.animatedImageIndex, 0,
                 this.size, this.size);
    if (this.animatedImageIndex == this.nbOfAnimatedImages - 1) {
      this.destruct();
    }
  }

  setImage() {
    this.image.src = `images/effects/${this.name}.svg`
  }

  animationUpdate(date) {
    const d = date.getSeconds()*1000 + date.getMilliseconds();
    if (Math.abs(d-this.lastFrameTime)
                         > this.timeBetweenFrames) {
      this.animatedImageIndex = (this.animatedImageIndex+1)
                                %this.nbOfAnimatedImages;
      this.lastFrameTime = d;
    }
  }
}
