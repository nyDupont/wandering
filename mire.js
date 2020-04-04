class Mire extends StateDisplayer {
  constructor(owner) {
    super();
    this.owner = owner;
    this.distanceToOwner = 0.75*owner.size;
    this.size = 20;
    this.angle = 0.5*Math.PI;
    this.image = new Image();
    this.image.src = 'images/mire.svg';
  }

  update() {
    this.setPosition();
    this.draw();
  }

  setPosition() {
    this.x = this.owner.x + this.distanceToOwner*Math.cos(this.angle);
    this.y = this.owner.y + this.distanceToOwner*Math.sin(this.angle);
  }

  setAngle(mouseX, mouseY) {
    let dx = mouseX - this.owner.x;
    if (dx == 0) {
      dx = 1; // to avoid dividing by zero in arctan;
    }
    const dy = mouseY - this.owner.y;
    // const distanceToHero = Math.sqrt(Math.pow(dyToHero,2) + Math.pow(dxToHero,2));
    this.angle = Math.atan(dy/dx);
    if (dx < 0) {
      this.angle += Math.PI;
    }
  }

  draw() {
    const theta = this.angle + Math.PI/2; // + pi/2 because mire.svg faces north
    // ctx.setTransform(1, 0, 0, 1, this.x, this.y);
    ctx.rotate(theta);
    const newX = this.x*Math.cos(theta) + this.y*Math.sin(theta);
    const newY = -this.x*Math.sin(theta) + this.y*Math.cos(theta);
    ctx.drawImage(this.image,
                  Math.round(newX),
                  Math.round(newY),
                  // Math.round(this.x),
                  // Math.round(this.y),
                  Math.round(this.size), Math.round(this.size));
    ctx.rotate(-theta);
    // ctx.setTransform(1, 0, 0, 1, -this.x, -this.y);
  }
}
