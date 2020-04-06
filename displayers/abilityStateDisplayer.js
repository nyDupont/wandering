class AbilityStateDisplayer extends StateDisplayer {
    constructor(ability, index) {
      super();
      this.ability = ability;
      this.name = this.ability.name;
      this.owner = this.ability.owner;
      this.index = index;
      this.size = 40;
      this.hSpaceBetweenAbility = 20;
      // this.y = hero.statBar.y - this.size/2 + hero.statBar.height + hero.statBar.vSpaceBetweenBars/2;
      this.y = this.owner.statBar.y - 5
      this.x = this.owner.statBar.x + 0.6*this.owner.statBar.width +
               (this.index-1)*(this.size+this.hSpaceBetweenAbility);
      this.image = new Image();
      this.imageSrcName = this.name;
      // this.state = 'up';
      this.setImage();

      this.cd = new CoolDownDisplayer(this.y, this.x, this.size);
    }

    update() {
      let cd;
      if (!this.ability.checkCD()) {
        let d1 = new Date();
        d1 = d1.getMinutes()*60000 + d1.getSeconds()*1000
             + d1.getMilliseconds();
        const d2 = this.ability.lastAbilityTime.getMinutes()*60000
                 + this.ability.lastAbilityTime.getSeconds()*1000
                 + this.ability.lastAbilityTime.getMilliseconds();
        cd = 1 - Math.abs(d1-d2)/1000 / this.ability.cd;
      } else {
        cd = 0;
      }
      // setImage();
      this.draw()
      // console.log(cd);
      this.cd.update(cd);
    }

    draw() {
      // console.log(this.image, this.x, this.y, this.size, this.size);
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }

    setImage() {
      this.image.src = 'images/abilities/' + this.imageSrcName + 'Ability.svg';
    }
}
