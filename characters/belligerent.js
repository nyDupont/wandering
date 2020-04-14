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
    this.fontHealthColor = '#aa2010';
    this.fontHpLoss = (0.3*this.size).toString() + 'px Arial';
  }

  update(date) {
    this.setPosition();
    this.statRecOverTime();
    fov.draw(this);
    if (this.isMoving) {
      this.walkingDustEffect.update(date);
    }
  }

  death() {
    this.destruct();
    this.statBar.destruct();
  }

  loseHp(hpLoss) {
    this.lastHpLossTime = new Date();
    // this.loseHpAnimation(hpLoss);
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

  knockBack(direction, amount) {
    this.xCoord += amount*Math.cos(direction);
    this.yCoord += amount*Math.sin(direction);
  }

  sprint(str) {
    // str takes value ['On', 'Off']
    if (str == 'On') {
      this.speed = this.runSpeed;
    } else if (str == 'Off') {
      this.speed = this.walkSpeed;
    }
  }

  loseHpAnimation(hpLoss) {
    this.imageSrcName += 'NB';
    this.setImage(this.direction, 0);
    const l = this.imageSrcName.length;
    this.imageSrcName = this.imageSrcName.slice(0, l-2);
    // console.log(this.imageSrcName);
    ctx.fillStyle = this.fontHealthColor;
    ctx.font = this.fontHpLoss;
    ctx.fillText('-' + hpLoss.toString(), this.x, this.y-this.size/2);
  }
}
