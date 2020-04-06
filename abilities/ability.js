class Ability {
  constructor(owner) {
    this.name;
    this.owner = owner;
    this.cd;
    this.lastAbilityTime;
  }

  update() {
    this.abilityStateDisplayer.update();
  }

  checkCD() {
    let d1 = new Date();
    d1 = d1.getMinutes()*60 + d1.getSeconds();
    let d2 = this.lastAbilityTime.getMinutes()*60
             + this.lastAbilityTime.getSeconds();
    if (Math.abs(d1-d2) >= this.cd) {
      return true;
    } else {
      return false;
    }
  }
}
