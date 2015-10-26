(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = 700;
  var DIM_Y = 700;
  var NUM_ASTEROIDS = 5;

  // var Game = Asteroids.Game = function (xDim, yDim) {
  var Game = Asteroids.Game = function () {
    this.xDim = DIM_X;
    this.yDim = DIM_Y;
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
  };

  Game.prototype.allObjects = function () {
    var copyAsteroids = this.asteroids.slice();
    copyAsteroids.push(this.ship);
    return copyAsteroids;
  };

  Game.prototype.randomPosition = function () {
    return [this.xDim * Math.random(), this.yDim * Math.random()];
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship( this.randomPosition(), this);

    this.ship = ship;

    return ship;
  };

  Game.prototype.addAsteroids = function () {
    var asteroids = [];
    for (var i = 0; i < NUM_ASTEROIDS; i++){
      asteroids.push(new Asteroids.Asteroid({
        pos: this.randomPosition(),
        game: this
      }));
    }

    return asteroids;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    this.allObjects().forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.step = function (){
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    //pos[0] current x pos
    //pos[1] current y pos
    var curX = pos[0];
    var curY = pos[1];
    var wrappedPos = [curX, curY];



    if (curX < 0) {
      wrappedPos[0] = curX + this.xDim;
    }

    if (curX > this.xDim) {
      wrappedPos[0] = curX - this.xDim;
    }

    if (curY < 0) {
      wrappedPos[1] = curY + this.yDim;
    }

    if (curY > this.xDim) {
      wrappedPos[1] = curY - this.yDim;
    }

    return wrappedPos;
  };

  Game.prototype.checkCollisions = function (){
    for(var i = 0; i < (this.allObjects().length - 1); i++){
      for(var j = (i + 1); j < this.allObjects().length; j++){
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          // alert("COLLISION");
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.remove = function (object) {
    var result = [];
    for (var i = 0; i < this.asteroids.length; i++) {
      var xPos = object.pos[0];
      var yPos = object.pos[1];
      if (this.asteroids[i].pos[0] !== xPos && this.asteroids[i].pos[1] !== yPos) {
        // debugger
        result.push(this.asteroids[i]);
      }
    }
    this.asteroids = result;

  };

})();
