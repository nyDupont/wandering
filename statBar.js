function StatBar() {
    this.y = 0.9*canvas.height;
    this.x = 0.5*canvas.width;
    this.height = 10;
    this.width = 200;
    this.vSpaceBetweenBars = 20;
    this.healthColor = '#aa2010';
    this.manaColor = '#1540aa'
    this.strokeColor = '#101010';

    this.font = this.height.toString() + ' Arial';

    this.draw = function() {
        ctx.strokeStyle = this.strokeColor;
        // health
        ctx.fillStyle = this.healthColor;
        ctx.fillRect(this.x-this.width/2, this.y,
                     hero.hp/hero.maxHp*this.width, this.height);
        ctx.strokeRect(this.x-this.width/2-1, this.y-1,
                       this.width+2, this.height+2);
        ctx.fillText(Math.round(hero.hp).toString() + '/' + hero.maxHp.toString(),
                     this.x-this.width/2, this.y-this.height/2);
        // mana
        ctx.fillStyle = this.manaColor;
        ctx.fillRect(this.x-this.width/2, this.y+this.vSpaceBetweenBars,
                     hero.mana/hero.maxMana*this.width, this.height);
        ctx.strokeRect(this.x-this.width/2-1,
                       this.y-1+this.vSpaceBetweenBars,
                       this.width+2, this.height+2);
        ctx.fillText(Math.round(hero.mana).toString() + '/' + hero.maxMana.toString(),
                     this.x-this.width/2,
                     this.y+this.vSpaceBetweenBars+2.5*this.height);
    };
};
