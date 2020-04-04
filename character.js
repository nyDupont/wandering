class Character {
  constructor() {
    this.y;
    this.x;
    this.size;
    this.speed;
    this.isMoving;
    this.direction;
    this.image = new Image();
    this.imageSrcName;
    this.animatedImageIndex = 0;
    this.possibleDirection = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE'];
    this.hitbox;
    this.hitBoxDebug = false;
  }

  update() {
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
      const ok2goN = map.i >= 0 && this.y >= 0;
      const ok2goS = map.i <= map.i_max && this.y < canvas.height;
      const ok2goE = map.j <= map.j_max && this.x < canvas.width;
      const ok2goW = map.j >= 0 && this.x >= 0;
      switch(this.direction) {
        case 'N':
          if (ok2goN) {
            this.y -= this.speed;
          };
          break;
        case 'S':
          if (ok2goS) {
            this.y += this.speed;
          };
          break;
        case 'W':
          if (ok2goW) {
            this.x -= this.speed;
          };
          break;
        case 'E':
          if (ok2goE) {
            this.x += this.speed;
          };
          break;
        case 'NW':
          if (ok2goN) {
            this.y -= this.speed/Math.sqrt(2);
          };
          if (ok2goW) {
            this.x -= this.speed/Math.sqrt(2);
          };
          break;
        case 'NE':
          if (ok2goN) {
            this.y -= this.speed/Math.sqrt(2);
          };
          if (ok2goE) {
            this.x += this.speed/Math.sqrt(2);
          };
          break;
        case 'SW':
          if (ok2goS) {
            this.y += this.speed/Math.sqrt(2);
          };
          if (ok2goW) {
            this.x -= this.speed/Math.sqrt(2);
          };
          break;
        case 'SE':
          if (ok2goS) {
            this.y += this.speed/Math.sqrt(2);
          };
          if (ok2goE) {
            this.x += this.speed/Math.sqrt(2);
          };
          break;
      }
    }
  }

  walkingAnimationUpdate() {
    if (this.isMoving) {
      this.animatedImageIndex = (this.animatedImageIndex+1)%4;
      this.setImage(this.direction, this.animatedImageIndex);
    }
  }

  setImage(direction, animatedImageIndex) {
    this.image.src = 'images/' + this.imageSrcName + '_'
                     + direction[direction.length-1] + '_'
                     + animatedImageIndex.toString() + '.svg';
  }
}
