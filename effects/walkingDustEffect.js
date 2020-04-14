class WalkingDustEffect {
  constructor(owner) {
    this.owner = owner;

    this.delay = 400; // ms

    this.lastTriggTime = 0;
    this.minTriggDelay = 200; // ms
    this.nextTriggDelay = this.minTriggDelay;
  }

  update(date) {
    const d = date.getSeconds()*1000 + date.getMilliseconds();
    if (Math.abs(d-this.lastTriggTime) > this.nextTriggDelay) {
      const dustEffect = new DustEffect(this.owner.xCoord, this.owner.yCoord+this.owner.size/2,
                                        this.delay);
      this.lastTriggTime = d;
      this.nextTriggDelay = this.minTriggDelay*(1+0.5*Math.random());
    }
  }
}
