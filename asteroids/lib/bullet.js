(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options){
    options.radius = Bullet.RADIUS;
    options.color = "#FF0000";

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.collideWith  = function (otherObject) {

    if (otherObject instanceof Asteroids.Asteroid){

      if (otherObject.health === 0) {
        var sprite = new Asteroids.Sprite({pos: this.pos, game: this.game,
                          url: "./GrenadeExplosion.png", frames: 20});
        this.game.addSprite(sprite);


      if (otherObject.radius === 15) {
        var newAsteroid1 = new Asteroids.Asteroid({pos: this.pos.slice(),
              vel: Asteroids.Util.randomVelocity(10), radius: 5, health: 2,
              game: this.game});
        var newAsteroid2 = new Asteroids.Asteroid({pos: this.pos.slice(),
              vel: Asteroids.Util.randomVelocity(10), radius: 5, health: 2,
              game: this.game});
        var newAsteroid3 = new Asteroids.Asteroid({pos: this.pos.slice(),
              vel: Asteroids.Util.randomVelocity(10), radius: 5, health: 2,
              game: this.game});
        this.game.addAsteroid(newAsteroid1);
        this.game.addAsteroid(newAsteroid2);
        this.game.addAsteroid(newAsteroid3);
      }

        this.game.remove(otherObject);
        this.game.remove(this);
      } else {
        this.game.remove(this);
        otherObject.health -= 1;
      }
    }
  };

})();
