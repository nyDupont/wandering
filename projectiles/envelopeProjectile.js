class EnvelopeProjectile extends AnimatedProjectile {
  constructor(owner, directionAngle) {
    super();
    this.owner = owner;
    this.xCoord = this.owner.xCoord;
    this.yCoord = this.owner.yCoord;
    this.directionAngle = directionAngle;

    this.speed = 15;
    this.size = 40;
    this.damage = 2;
    this.criticalDamage = 5;
    this.knockBack = 3;

    this.hitbox = new ProjectileHitbox(this, this.size, this.size, this.owner);

    this.nbOfAnimatedImages = 8;
    this.timeBetweenFrames = 60; // ms

    this.nbOfBackAppearances = 1;
    this.nbOfFrontAppearances = 3;
    this.hogwartStyleChance = 0.1;
    this.imageSrcName = this.pickRandomAppearance();
    this.setImage();
  }

  pickRandomAppearance() {
    let string = 'envelopes/envelope_'
    const fOrB = Math.random(); // front or back
    if (Math.random() < this.hogwartStyleChance) {
      this.damage = this.criticalDamage;
      if (fOrB < 0.5) {
        string += 'fHP';
        return string;
      } else {
        string += 'bHP';
        return string;
      }
    } else {
      const rand = Math.random();
      if (fOrB < 0.5) {
        string += 'f';
        for (let i=1; i<=this.nbOfFrontAppearances; i++) {
          if (rand >= 1-i/this.nbOfFrontAppearances) {
            string += (i-1).toString();
            return string;
          }
        }
      } else {
        string += 'b';
        // console.log(this.nbOfBackAppearances);
        for (let i=1; i<=this.nbOfBackAppearances; i++) {
          // console.log(i);
          if (rand >= 1-i/this.nbOfBackAppearances) {
            // console.log('yo', i);
            string += (i-1).toString();
            return string;
          }
        }
      }
    }
  }
}
