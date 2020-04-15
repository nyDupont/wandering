class Character {
  constructor() {
    this.xCoord; // on map (i.e. absolute)
    this.yCoord;
    this.size;
    this.speed;
    this.isMoving; // boolean telling if coords must changed by speed or not
    this.animationState; // string telling what sprites to load (walk, run, etc)
    this.direction;
    this.isMoving = false;
    this.animationState = 'resting';
    this.image = new Image();
    this.imageSrcName;
    this.animatedImageIndex = 0;
    this.nbOfAnimatedImages;
    this.timeBetweenFrames;
    this.spriteWidth;
    this.spriteHeight;
    this.lastFrameTime = new Date().getMilliseconds();
    this.possibleDirection = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE'];
    this.hitbox;
    // this.hitBoxDebug = false;

    listOfObjectsToUpdate.push(this);
  }

  destruct() {
    this.hitbox.destruct();
    listOfObjectsToUpdate.splice(listOfObjectsToUpdate.indexOf(this), 1);
  }

  update(date) {
    this.hitbox.update();
    this.setPosition();
    fov.draw(this);
  }

  setDirection(direction) {
    this.direction = direction;
    this.setImage(this.direction, this.animatedImageIndex);
  }

  setMotionState(state) {
    if (state == 'moving') {
      this.isMoving = true;
      this.animationState = 'walking';
      this.setImage();
    } else {
      this.isMoving = false;
      this.animationState = 'resting';
      this.setImage();
    }
  }

  setPosition() {
    if (this.isMoving) {
      // condition for the absoluteMap
      // const ok2goN = map.i >= 0 && this.y >= 0;
      // const ok2goS = map.i <= map.i_max && this.yCoord < canvas.height;
      // const ok2goE = map.j <= map.j_max && this.xCoord < canvas.width;
      // const ok2goW = map.j >= 0 && this.xCoord >= 0;

      // conditions for the square relativeMap
      const ok2goN = this.yCoord > 0;
      const ok2goS = this.yCoord < map.totalHeight;
      const ok2goE = this.xCoord < map.totalWidth;
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
    }
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

  setImage() {
    console.log('images/characters/' + this.imageSrcName + '_'
                + this.animationState + '_' + this.direction[this.direction.length-1] + '.svg');
    // this.image.src = 'images/' + this.imageSrcName + '_' + this.animationSate
    //                  + '_' + direction[direction.length-1] + '.svg';
    this.image.src = 'images/characters/' + this.imageSrcName + '_'
                + this.animationState + '_'
                + this.direction[this.direction.length-1] + '.svg';
  }
}
