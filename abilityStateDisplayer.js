class AbilityStateDisplayer extends StateDisplayer {
    constructor(name, owner, index) {
      super();
      this.name = name;
      this.owner = owner;
      this.index = index;
      this.size = 40;
      this.hSpaceBetweenAbility = 20;
      // this.y = hero.statBar.y - this.size/2 + hero.statBar.height + hero.statBar.vSpaceBetweenBars/2;
      this.y = hero.statBar.y - 5
      this.x = hero.statBar.x + 0.6*hero.statBar.width +
               (index-1)*(this.size+this.hSpaceBetweenAbility);
      this.image = new Image();
      this.imageSrcName = this.name;
      // this.state = 'up';
      this.setImage();

      this.cd = new CoolDownDisplayer(this.y, this.x, this.size);
    }

    update() {
      let cd;
      if (!this.owner.checkCD(this.owner.swirlCD, this.owner.lastSwirlTime)) {
        let d1 = new Date();
        d1 = d1.getMinutes()*60000 + d1.getSeconds()*1000
             + d1.getMilliseconds();
        const d2 = this.owner.lastSwirlTime.getMinutes()*60000
                 + this.owner.lastSwirlTime.getSeconds()*1000
                 + this.owner.lastSwirlTime.getMilliseconds();
        cd = 1 - Math.abs(d1-d2)/1000 / this.owner.swirlCD;
      } else {
        cd = 0;
      }
      // setImage();
      this.draw()
      // console.log(cd);
      this.cd.update(cd);
    }

    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }

    setImage() {
      this.image.src = 'images/' + this.imageSrcName + '.svg';
    }
}
