function Hero() {
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.walkSpeed = 1;
  this.sprintSpeed = 3;
  // this.dashSpeed = 5;
  this.speed = this.walkSpeed;
  this.isMoving = false;
  this.direction = 'S';
  this.size = 50;
  this.image = new Image();
  this.animatedImageIndex = 0;
  this.image.src = 'images/fox_' + this.direction[this.direction.length-1] +
                   '_' + this.animatedImageIndex.toString() + '.svg';


  this.draw = function(arg) {
    // console.log(this.isMoving);
    ctx.drawImage(this.image, Math.round(this.x-this.size/2),
                  Math.round(this.y-this.size/2), this.size, this.size);
    if (this.isMoving && arg==1) {
      this.animatedImageIndex = (this.animatedImageIndex+1)%4;
      this.setImage();
    };
  };

  this.setDirection = function(direction) {
    this.direction = direction;
    console.log(this.direction[this.direction.length-1]);
    this.setImage();
  };

  this.setImage = function() {
    console.log(this.direction, this.animatedImageIndex);
    this.image.src = 'images/fox_' + this.direction[this.direction.length-1] +
                     '_' + this.animatedImageIndex.toString() + '.svg';
  };

  this.setMotionState = function(state) {
    if (state == 'moving') {
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
  };

  this.setPosition = function() {
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
    if (this.x >= canvas.width && map.j < map.j_max) {
      this.x = 0;
      map.setCoords(map.i, map.j+1);
    }
    if (this.x < 0 && map.j > 0) {
      this.x = canvas.width-1;
      map.setCoords(map.i, map.j-1);
    }
    if (this.y >= canvas.height && map.i < map.i_max) {
      this.y = 0;
      map.setCoords(map.i+1, map.j);
    }
    if (this.y < 0 && map.i > 0) {
      this.y = canvas.height-1;
      map.setCoords(map.i-1, map.j);
    }
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }

  this.sprintOn = function() {
    this.speed = this.sprintSpeed;
  }

  this.sprintOff = function() {
    this.speed = this.walkSpeed;
  }
  // this.randomizeColor = function () {
  //   this.color = '#' + Math.round(Math.random()*Math.pow(16, 6)).toString(16);
  // }

  // this.eat = function(fruit) {
  //   if (this.x === fruit.x && this.y === fruit.y) {
  //     this.total ++;
  //     return true;
  //   }
  //   return false;
  // }
}
