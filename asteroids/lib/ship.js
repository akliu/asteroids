(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.color = options.color || Ship.COLOR;
    options.vel = options.vel || [1,0];

    Asteroids.MovingObject.call(this, options);
  };
  Ship.RADIUS = 5;

  Ship.COLOR = "#FF0000";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    // debugger
    var norm = Asteroids.Util.norm(this.vel);

    if (norm === 0) {
      // Can't fire unless moving.
      return;
    }

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos.slice(),
      vel: bulletVel,
      // color: this.color,
      game: this.game
    });

    this.game.addBullet(bullet);
  };

})();
