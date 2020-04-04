const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

function Map(i_max, j_max, i_init, j_init) {
  this.i_max = i_max;
  this.j_max = j_max;
  this.i = i_init;
  this.j = j_init;
  this.image = new Image();
  this.image.src = 'images/road_'+this.i.toString()+this.j.toString()+'.svg';
  this.firstDraw = true;

  this.update = function() {
    this.draw();
  }

  this.draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
  }

  this.setCoords = function(coords) {
    this.i = coords[0];
    this.j = coords[1];
    this.image.src = 'images/road_'+this.i.toString()+this.j.toString()+'.svg';
  }

}
