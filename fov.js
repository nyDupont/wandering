class FieldOfView { // dubbed as 'fov'
  constructor(relative) {
    this.relative = relative; // about who the fov will be centered
    this.xCoord = this.relative.xCoord; // coordinates of the center point of the fov
    this.yCoord = this.relative.yCoord;
    this.width = canvas.width;
    this.height = canvas.height;
    this.scale = 2; // scale of items in fov
    this.checkScale();
    this.movementMapForseening = 50;


    // fov movement intertia constants :
    this.movementIntertiaBool = true; // true or false to turn it on or off
    this.x2b; // coordinates about where the fov will be centered after at most
    this.y2b; // this.timeInertia ms (to give an effect of inertia)
    this.velocityInertia = 0;
    this.maxVelocityInertia = relative.speed*2;
    this.accelerationTime = 100;
    this.dt = 10;
    this.lastFovMovTime = new Date().getMilliseconds();
    this.acceptedError = 2; // accepted error on coord2b - coord
  }

  update(date) {
    if (!this.relative.isMoving) {
      this.setCoords(this.relative.xCoord, this.relative.yCoord);
    } else {
      this.relativeInMovement()
    }
    let d1 = date.getMilliseconds()
    const ecartMax = Math.max(Math.abs(this.xCoord - this.x2b),
                              Math.abs(this.yCoord - this.y2b));
    if (ecartMax > this.acceptedError) {
      if (Math.abs(d1-this.lastFovMovTime) > this.dt) {
        this.movementIntertia(this.velocityInertia);
        // console.log(this.velocityInertia)
        if (ecartMax >= this.movementMapForseening) { // gap too big -> accel
          this.velocityInertia += this.maxVelocityInertia
                                  / this.accelerationTime * this.dt;
          if (this.velocityInertia >= this.maxVelocityInertia) {
            this.velocityInertia = this.maxVelocityInertia;
          }
        } else { //gap small enought, start decelerating
          this.velocityInertia -= this.maxVelocityInertia
                                  / this.accelerationTime * this.dt;
          if (this.relative.isMoving && this.velocityInertia < this.relative.speed) {
            this.velocityInertia = this.relative.speed;
          } else if (this.velocityInertia < 0) {
            this.velocityInertia = 0;
          }
        }
        this.lastFovMovTime = d1;
      }
      // console.log(ecartMax, this.velocityInertia, this.x2b-this.xCoord, this.y2b-this.yCoord);
    } else {
      this.velocityInertia = 0;
    }
  }

  draw(item) {
    // console.log(item)
    const size = this.scale*item.size;
    const deltaX = this.scale*(item.xCoord - this.xCoord);
    const deltaY = this.scale*(item.yCoord - this.yCoord);
    ctx.drawImage(item.image,
                  this.width/2 + deltaX - size/2,
                  this.height/2 + deltaY - size/2,
                  Math.round(size), Math.round(size));
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
    // introduce a dynamic time for below lines to be done?

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

  movementIntertia(speed) {
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
      if (Math.abs(speed*Math.cos(angle)) < Math.abs(deltaX)) {
        this.xCoord += speed*Math.cos(angle);
      } else {
        this.xCoord += deltaX;
      }
      if (Math.abs(speed*Math.sin(angle)) < Math.abs(deltaY)) {
        this.yCoord += speed*Math.sin(angle);
      } else {
        this.yCoord += deltaY;
      }
    } else {
      this.xCoord = this.x2b;
      this.yCoord = this.y2b;
    }
  }

  relativeInMovement() {
    switch(this.relative.direction) {
      case 'N':
        this.setCoords(this.relative.xCoord, this.relative.yCoord
                       - this.scale*this.movementMapForseening);
        break;
      case 'S':
        this.setCoords(this.relative.xCoord, this.relative.yCoord
                       + this.scale*this.movementMapForseening);
        break;
      case 'E':
        this.setCoords(this.relative.xCoord + this.scale*this.movementMapForseening,
                       this.relative.yCoord);
        break;
      case 'W':
        this.setCoords(this.relative.xCoord - this.scale*this.movementMapForseening,
                       this.relative.yCoord);
        break;
      case 'NW':
        this.setCoords(this.relative.xCoord
                       - this.scale*this.movementMapForseening/Math.sqrt(2),
                       this.relative.yCoord
                       - this.scale*this.movementMapForseening/Math.sqrt(2));
        break;
      case 'NE':
        this.setCoords(this.relative.xCoord
                       + this.scale*this.movementMapForseening/Math.sqrt(2),
                       this.relative.yCoord
                       - this.scale*this.movementMapForseening/Math.sqrt(2));
        break;
      case 'SE':
        this.setCoords(this.relative.xCoord
                       + this.scale*this.movementMapForseening/Math.sqrt(2),
                       this.relative.yCoord
                       + this.scale*this.movementMapForseening/Math.sqrt(2));
        break;
      case 'SW':
        this.setCoords(this.relative.xCoord
                       - this.scale*this.movementMapForseening/Math.sqrt(2),
                       this.relative.yCoord
                       + this.scale*this.movementMapForseening/Math.sqrt(2));
        break;
    }
  }
}
