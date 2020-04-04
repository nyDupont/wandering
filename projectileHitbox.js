listOfProjectileHitbox = [];

class ProjectileHitbox extends Hitbox {
  constructor(owner, width, height, source) {
    super(owner, width, height);
    this.source = source;
    this.hitTarget;

    listOfProjectileHitbox.push(this);
  }

  destruct() {
    listOfProjectileHitbox.splice(listOfProjectileHitbox.indexOf(this), 1);
  }

  collides() {
    // const listOfHitbox2check = listOfHitbox.splice(listOfHitbox.indexOf(this), 1);
    for (let target of listOfTargetHitbox) {
      const sourceCondition = this.source != target.owner;
      const xCondition = Math.abs(this.x-target.x) <= Math.abs(this.width-target.width);
      const yCondition = Math.abs(this.y-target.y) <= Math.abs(this.height-target.height);
      if (sourceCondition && xCondition && yCondition) {
        console.log(this.owner.imageSrcName + ' has collided with ' + target.owner.imageSrcName);
        this.hitTarget = target.owner;
        return true;
        // return true; // breaking the loop ; thus handling only one collision
      }
    }
  }
}
