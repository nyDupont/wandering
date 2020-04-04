class Belligerent extends Character {
  constructor() {
    super();
    // heatlh
    this.hp;
    this.maxHp;
    this.timeBeforeHpHealing;
    this.hpHealingSpeed;
    this.lastHpLossTime;
    // mana
    this.mana;
    this.manMana;
    this.timeBeforeManaHealings;
    this.manaHealingSpeed;
    this.lastManaLossTime;

    this.walkSpeed;
    this.runSpeed;
    this.normalSize;

    this.statBar;
  }

  update() {
    this.setPosition();
    this.statRecOverTime();
    this.draw();
  }

  death() {
    listOfObjectsToUpdate.splice(listOfObjectsToUpdate.indexOf(this), 1);
    this.hitbox.destruct();
  }

  loseHp(hpLoss) {
    this.lastHpLossTime = new Date();
    if (this.hp <= hpLoss) {
      this.hp = 0;
      this.death();
    } else {
      this.hp -= hpLoss;
    }
  }

  loseMana(manaLoss) {
    // loseMana returns a boolean as it is used to check if Belligerent instance
    // has enought mana to cast a given spell
    if (this.mana >= manaLoss) {
      this.lastManaLossTime = new Date();
      this.mana -= manaLoss;
      return true;
    }  else {
      return false;
    }
  }

  statRecOverTime() {
    // health
    if (this.hp < this.maxHp) {
      let d1 = new Date();
      d1 = d1.getMinutes()*60+d1.getSeconds();
      const d2 = this.lastHpLossTime.getMinutes()*60+this.lastHpLossTime.getSeconds();
      if (Math.abs(d1-d2) > this.timeBeforeHpHealing) {
        this.hp += this.hpHealingSpeed;
      }
    }
    // mana
    if (this.mana < this.maxMana) {
      let d1 = new Date();
      d1 = d1.getMinutes()*60+d1.getSeconds();
      const d2 = this.lastManaLossTime.getMinutes()*60+this.lastManaLossTime.getSeconds();
      if (Math.abs(d1-d2) > this.timeBeforeManaHealing) {
        this.mana += this.manaHealingSpeed;
      }
    }
  }

  sprint(str) {
    // str takes value ['On', 'Off']
    if (str == 'On') {
      this.speed = this.runSpeed;
    } else if (str == 'Off') {
      this.speed = this.walkSpeed;
    }
  }
}
