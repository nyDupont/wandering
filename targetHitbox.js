var listOfTargetHitbox = [];

class TargetHitbox extends Hitbox {
  constructor(owner, width, height) {
    super(owner, width, height);

    listOfTargetHitbox.push(this);
  }

  destruct() {
    listOfTargetHitbox.splice(listOfTargetHitbox.indexOf(this), 1);
  }
}
