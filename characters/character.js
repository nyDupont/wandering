class Character {
  constructor() {
    this.x; // on canvas, where drawn on screen
    this.y;
    this.xCoord; // on map
    this.yCoord;
    this.size;
    this.speed;
    this.positionNumericalPrecision = 100 // = 10^(nbOfDecimalsDesired)
    this.isMoving;
    this.direction;
    this.image = new Image();
    this.imageSrcName;
    this.animatedImageIndex = 0;
    this.nbOfAnimatedImages;
    this.timeBetweenFrames;
    this.lastFrameTime = new Date().getMilliseconds();
    this.possibleDirection = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE'];
    this.hitbox;
    this.hitBoxDebug = false;

    listOfObjectsToUpdate.push(this);
  }

  destruct() {
    this.hitbox.destruct();
    listOfObjectsToUpdate.splice(listOfObjectsToUpdate.indexOf(this), 1);
  }

  update(date) {
    this.hitbox.update();
    this.setPosition();
    this.draw();
  }

  draw() {
    ctx.drawImage(this.image,
                  Math.round(this.x-this.size/2),
                  Math.round(this.y-this.size/2),
                  Math.round(this.size), Math.round(this.size));
    if (this.hitBoxDebug) {
      ctx.fillStyle = this.hitBoxDebug_fillStyleRGBa;
      ctx.fillRect(Math.round(this.x-0.75*this.size/2),
                   Math.round(this.y-0.9*this.size/2),
                   Math.round(0.75*this.size), Math.round(0.9*this.size));
    }


  }

  setDirection(direction) {
    this.direction = direction;
    this.setImage(this.direction, this.animatedImageIndex);
  }

  setMotionState(state) {
    if (state == 'moving') {
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
  }

  setPosition() {
    if (this.isMoving) {
      // condition for the absoluteMap
      // const ok2goN = map.i >= 0 && this.y >= 0;
      // const ok2goS = map.i <= map.i_max && this.yCoord < canvas.height;
      // const ok2goE = map.j <= map.j_max && this.xCoord < canvas.width;
      // const ok2goW = map.j >= 0 && this.xCoord >= 0;

      const ok2goN = this.yCoord > 0;
      const ok2goS = this.yCoord < map.totalHeight;
      const ok2goE =  this.xCoord < map.totalWidth;
      const ok2goW = this.xCoord > 0;
      switch(this.direction) {
        case 'N':
          if (ok2goN) {
            this.yCoord -= this.speed;
          };
          break;
        case 'S':
          if (ok2goS) {
            this.yCoord += this.speed;
          };
          break;
        case 'W':
          if (ok2goW) {
            this.xCoord -= this.speed;
          };
          break;
        case 'E':
          if (ok2goE) {
            this.xCoord += this.speed;
          };
          break;
        case 'NW':
          if (ok2goN) {
            this.yCoord -= this.speed/Math.sqrt(2);
          };
          if (ok2goW) {
            this.xCoord -= this.speed/Math.sqrt(2);
          };
          break;
        case 'NE':
          if (ok2goN) {
            this.yCoord -= this.speed/Math.sqrt(2);
          };
          if (ok2goE) {
            this.xCoord += this.speed/Math.sqrt(2);
          };
          break;
        case 'SW':
          if (ok2goS) {
            this.yCoord += this.speed/Math.sqrt(2);
          };
          if (ok2goW) {
            this.xCoord -= this.speed/Math.sqrt(2);
          };
          break;
        case 'SE':
          if (ok2goS) {
            this.yCoord += this.speed/Math.sqrt(2);
          };
          if (ok2goE) {
            this.xCoord += this.speed/Math.sqrt(2);
          };
          break;
      }
      // console.log(this.xCoord, this.yCoord);
      // console.log(this.x, this.y);
    }
  }

  walkingAnimationUpdate() {
    this.animatedImageIndex = (this.animatedImageIndex+1)
                              %this.nbOfAnimatedImages;
    this.setImage(this.direction, this.animatedImageIndex);
  }

  setImage(direction, animatedImageIndex) {
    this.image.src = 'images/' + this.imageSrcName + '_'
                     + direction[direction.length-1] + '_'
                     + animatedImageIndex.toString() + '.svg';
  }
}
