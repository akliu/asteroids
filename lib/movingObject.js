( function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];

    if (this.game.isOutOfBounds(this.pos)) {
      if(this.isWrappable){
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var sumRadii = this.radius + otherObject.radius;
    var rangeX = [this.pos[0] - sumRadii, this.pos[0] + sumRadii];
    var rangeY = [this.pos[1] - sumRadii, this.pos[1] + sumRadii];

    if (otherObject.pos[0] > rangeX[0] && otherObject.pos[0] < rangeX[1] &&
      otherObject.pos[1] > rangeY[0] && otherObject.pos[1] < rangeY[1]) {
        return true;
      } else {
        return false;
      }
  };

})();
