class FieldOfView { // dubbed as 'fov'
  constructor(relative) {
    this.relative = relative; // about who the fov will be centered
    this.width = canvas.width;
    this.height = canvas.height;
    this.scale; // scale of things in fov
    this.setScale(1);

    this.xCoord; // coordinates of the center point of the fov
    this.yCoord;
    this.movementIntertiaBool = false; // at least temporarily
    this.setCoords(this.relative.xCoord, this.relative.yCoord);

    this.forseeningBool = true;
    this.mapForseening = 10; // in the direction this.relative is going;

    // fov movement intertia constants :
    this.movementIntertiaBool = true; // true or false to turn it on or off
    this.x2b; // coordinates about where the fov will be centered after at most
    this.y2b; // this.timeInertia ms (to give an effect of inertia)
    this.maxError; // max error on x or y in the placement of the fov
    // it has to be defined not to correct the postion forever, e.g. if resting
    this.acceptedError = 2; // accepted error on coord2b - coord
    this.velocityInertia = 0;
    this.fovHeroSpeedRatio = 1.2;
    this.maxVelocityInertia = relative.speed*this.fovHeroSpeedRatio;
    this.accelerationTime = 60;
    this.dt = 10;
    this.lastFovMovTime = new Date().getMilliseconds();
  }

  update(date) {
    if (this.forseeningBool && this.relative.isMoving) {
      this.forseeningMap()
    } else {
      this.setCoords(this.relative.xCoord, this.relative.yCoord);
    }
    let d1 = date.getMilliseconds()
    this.maxError = Math.max(Math.abs(this.xCoord - this.x2b),
                              Math.abs(this.yCoord - this.y2b));
    if (this.maxError > this.acceptedError) {
      if (Math.abs(d1-this.lastFovMovTime) > this.dt) {
        this.intertialMovement();
        this.inertialAcceleration();
        this.lastFovMovTime = d1;
      }
      // console.log(ecartMax, this.velocityInertia, this.x2b-this.xCoord, this.y2b-this.yCoord);
    } else {
      this.velocityInertia = 0;
    }
    // console.log(this.velocityInertia);
  }

  draw(item) {
    const size = this.scale*item.size;
    const deltaX = this.scale*(item.xCoord - this.xCoord);
    const deltaY = this.scale*(item.yCoord - this.yCoord);
    ctx.drawImage(item.image,
                  this.width/2 + deltaX - size/2,
                  this.height/2 + deltaY - size/2,
                  Math.round(size), Math.round(size));
  }

  clipDraw(item, sx, sy, sw, sh) {
    const width = this.scale*item.spriteWidth/item.spriteHeight*item.size;
    const height = this.scale*item.size;
    const deltaX = this.scale*(item.xCoord - this.xCoord);
    const deltaY = this.scale*(item.yCoord - this.yCoord);
    // console.log(item.image, sx, sy, sw, sh,
                  // this.width/2 + deltaX - width/2,
                  // this.height/2 + deltaY - height/2,Math.round(width), Math.round(height))
    ctx.drawImage(item.image, sx, sy, sw, sh,
                  this.width/2 + deltaX - width/2,
                  this.height/2 + deltaY - height/2,
                  Math.round(width), Math.round(height));
  }

  fillRect(x, y, w, h, absolute_boolean) {
    if (absolute_boolean) {
      ctx.fillRect(x, y, w, h);
    } else {
      ctx.fillRect(x-this.xCoord, y-this.yCoord, w, h);
    }
  }

  strokeRect(x, y, w, h, absolute_boolean) {
    if (absolute_boolean) {
      ctx.strokeRect(x, y, w, h);
    } else {
      ctx.strokeRect(x-this.xCoord, y-this.yCoord, w, h);
    }
  }

  fillText(text, x, y, absolute_boolean) {
    if (absolute_boolean) {
      ctx.fillText(text, x, y);
    } else {
      ctx.fillText(text, x-this.xCoord, y-this.yCoord);
    }
  }

  strokeText(text, x, y, absolute_boolean) {
    if (absolute_boolean) {
      ctx.strokeText(text, x, y);
    } else {
      ctx.strokeText(text, x-this.xCoord, y-this.yCoord);
    }
  }

  drawMap(map) {
    ctx.clearRect(0, 0, this.width, this.height); //this.w and not canvas.w
    // in case fov.w < canvas.w, say we implement a border of some kind
    ctx.drawImage(map.image,
                  Math.round(this.width/2 - this.scale*this.xCoord),
                  Math.round(this.height/2 - this.scale*this.yCoord),
                  Math.round(this.scale*map.totalWidth),
                  Math.round(this.scale*map.totalHeight));
    // the 9 arguments def on drawImage (clipping image) might be better
    // we here draw a bigger map than canvas
  }

  setRelative(relative) {
    this.relative = relative;
    this.setCoords(this.relative.xCoord, this.relative.yCoord);
  }

  setCoords(xCoord, yCoord) {
    if (this.movementIntertiaBool) {
      if (xCoord < 0.5*this.width/this.scale) {
        this.x2b = 0.5*this.width/this.scale;
      } else if (xCoord > map.totalWidth-0.5*this.width/this.scale) {
        this.x2b = map.totalWidth-0.5*this.width/this.scale;
      } else {
        this.x2b = xCoord;
      }
      if (yCoord < 0.5*this.height/this.scale) {
        this.y2b = 0.5*this.height/this.scale;
      } else if (yCoord > map.totalHeight-0.5*this.height/this.scale) {
        this.y2b = map.totalHeight-0.5*this.height/this.scale;
      } else {
        this.y2b = yCoord;
      }
    } else {
      if (xCoord < 0.5*this.width/this.scale) {
        this.xCoord = 0.5*this.width/this.scale;
      } else if (xCoord > map.totalWidth-0.5*this.width/this.scale) {
        this.xCoord = map.totalWidth-0.5*this.width/this.scale;
      } else {
        this.xCoord = xCoord;
      }
      if (yCoord < 0.5*this.height/this.scale) {
        this.yCoord = 0.5*this.height/this.scale;
      } else if (yCoord > map.totalHeight-0.5*this.height/this.scale) {
        this.yCoord = map.totalHeight-0.5*this.height/this.scale;
      } else {
        this.yCoord = yCoord;
      }
    }
  }

  intertialMovement() {
    if (this.movementIntertiaBool) {
      const deltaX = this.x2b - this.xCoord;
      const deltaY = this.y2b - this.yCoord;
      var angle;
      if (deltaX == 0) {
        if(deltaY >= 0) {
          angle = Math.PI/2;
        } else {
          angle = - Math.PI/2;
        }
      } else {
        angle = Math.atan(deltaY/deltaX);
      }
      if (deltaX < 0) {
        angle += Math.PI;
      }
      if (Math.abs(this.velocityInertia*Math.cos(angle)) < Math.abs(deltaX)) {
        this.xCoord += this.velocityInertia*Math.cos(angle);
      } else {
        this.xCoord += deltaX;
      }
      if (Math.abs(this.velocityInertia*Math.sin(angle)) < Math.abs(deltaY)) {
        this.yCoord += this.velocityInertia*Math.sin(angle);
      } else {
        this.yCoord += deltaY;
      }
    } else {
      this.xCoord = this.x2b;
      this.yCoord = this.y2b;
    }
  }

  inertialAcceleration() {
    if (this.relative.isMoving) {
      if (this.maxError >= this.mapForseening/2) { // gap too big -> accel
        this.velocityInertia += this.maxVelocityInertia
                                / this.accelerationTime * this.dt;
        if (this.velocityInertia >= this.maxVelocityInertia) {
          this.velocityInertia = this.maxVelocityInertia;
        }
      } else { //gap small enought, start decelerating
        // this.velocityInertia -= this.maxVelocityInertia
        //                         / this.accelerationTime * this.dt;
        this.velocityInertia -= 0.25*Math.pow((this.fovHeroSpeedRatio - 1)
                                *this.relative.speed, 2)/this.mapForseening
                                *this.dt;
        if (this.velocityInertia < this.relative.speed) {
          this.velocityInertia = this.relative.speed;
        }
      }
    } else { // hero stopped
      this.velocityInertia = 0.1*this.mapForseening/this.accelerationTime;
      // console.log(this.velocityInertia);
      if (this.velocityInertia < 0) {
        this.velocityInertia = 0;
      }
      // console.log(this.relative.speed);
    }
  }

  forseeningMap() {
    switch(this.relative.direction) {
      case 'N':
        this.setCoords(this.relative.xCoord, this.relative.yCoord
                       - this.scale*this.mapForseening);
        break;
      case 'S':
        this.setCoords(this.relative.xCoord, this.relative.yCoord
                       + this.scale*this.mapForseening);
        break;
      case 'E':
        this.setCoords(this.relative.xCoord + this.scale*this.mapForseening,
                       this.relative.yCoord);
        break;
      case 'W':
        this.setCoords(this.relative.xCoord - this.scale*this.mapForseening,
                       this.relative.yCoord);
        break;
      case 'NW':
        this.setCoords(this.relative.xCoord
                       - this.scale*this.mapForseening/Math.sqrt(2),
                       this.relative.yCoord
                       - this.scale*this.mapForseening/Math.sqrt(2));
        break;
      case 'NE':
        this.setCoords(this.relative.xCoord
                       + this.scale*this.mapForseening/Math.sqrt(2),
                       this.relative.yCoord
                       - this.scale*this.mapForseening/Math.sqrt(2));
        break;
      case 'SE':
        this.setCoords(this.relative.xCoord
                       + this.scale*this.mapForseening/Math.sqrt(2),
                       this.relative.yCoord
                       + this.scale*this.mapForseening/Math.sqrt(2));
        break;
      case 'SW':
        this.setCoords(this.relative.xCoord
                       - this.scale*this.mapForseening/Math.sqrt(2),
                       this.relative.yCoord
                       + this.scale*this.mapForseening/Math.sqrt(2));
        break;
    }
  }

  setScale(scale) {
    this.scale = scale;
    this.checkScale();
  }

  checkScale() {
    if (this.scale < this.width/map.totalWidth
        || this.scale < this.height/map.totalHeight) {
      if (this.width/map.totalWidth <= this.height/map.totalHeight) {
        this.scale = this.width/map.totalWidth;
      } else {
        this.scale = this.height/map.totalHeight;
      }
    }
  }
}
