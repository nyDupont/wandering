class StatBar extends StateDisplayer {
    constructor(owner, isMain) {
      super();
      this.owner = owner; // whose stats are concerned
      this.isMain = isMain;
      if (this.isMain) { // if this instance is main character's stat bar
        this.y = 0.9*canvas.height;
        this.x = 0.5*canvas.width;
        this.height = 10;
        this.width = 200;
        this.vSpaceBetweenBars = 20;
      } else {
        this.y = owner.y;
        this.x = owner.x;
        this.height = 5;
        this.width = 50;
        this.vSpaceBetweenBars = 10;
      }
      this.healthColor = '#aa2010';
      this.manaColor = '#1540aa'
      this.strokeColor = '#101010';
      // this.fillTextColor = '#FFFFFF';
      this.font = this.height.toString() + ' Arial';
    }

    draw() {
      if (!this.isMain) {
        this.y = this.owner.y-0.75*this.owner.size;
        this.x = this.owner.x;
      }
      ctx.strokeStyle = this.strokeColor;
      // health
      ctx.fillStyle = this.healthColor;
      ctx.fillRect(this.x-this.width/2, this.y,
                   this.owner.hp/this.owner.maxHp*this.width, this.height);
      ctx.strokeRect(this.x-this.width/2-1, this.y-1,
                     this.width+2, this.height+2);
      if (this.isMain) {
        ctx.fillText(Math.round(this.owner.hp).toString() + '/' + this.owner.maxHp.toString(),
                     this.x-this.width/2, this.y-this.height/2);
      }
      // ctx.fillStyle = this.fillTextColor;
      // ctx.fillText(Math.round(this.owner.hp).toString() + '/' + this.owner.maxHp.toString(),
      //              this.x-20, this.y+9);
      // mana
      ctx.fillStyle = this.manaColor;
      ctx.fillRect(this.x-this.width/2, this.y+this.vSpaceBetweenBars,
                   this.owner.mana/this.owner.maxMana*this.width, this.height);
      ctx.strokeRect(this.x-this.width/2-1,
                     this.y-1+this.vSpaceBetweenBars,
                     this.width+2, this.height+2);
      if (this.isMain) {
        ctx.fillText(Math.round(this.owner.mana).toString() + '/' + this.owner.maxMana.toString(),
                     this.x-this.width/2,
                     this.y+this.vSpaceBetweenBars+2.5*this.height);
      }
    }



}
