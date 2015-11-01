(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var NUM_ASTEROIDS = 8;

  var Game = Asteroids.Game = function (canvas) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.xDim = window.innerWidth;
    this.yDim = window.innerHeight;
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.lives = 3;
    this.sprites = [];

    this.addAsteroids();
  };

  Game.prototype.addSprite = function (sprite){
    this.sprites.push(sprite);
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.centerPosition(),
      game: this
    });

    this.ships.push(ship);
    return ship;
  };

  Game.prototype.won = function () {
    if (this.asteroids.length === 0){
      return true;
    }else{
      return false;
    }
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.asteroids, this.bullets);
  };

  Game.prototype.allObjectsAndExplosions = function () {
    return [].concat(this.ships, this.asteroids, this.bullets, this.sprites);
  };

  Game.prototype.randomPosition = function () {
    return [this.xDim * Math.random(), this.yDim * Math.random()];
  };

  Game.prototype.centerPosition = function () {
    return [this.xDim / 2 , this.yDim / 2];
  };

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.addAsteroid = function(asteroid) {
    this.asteroids.push(asteroid);
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++){
      this.asteroids.push(new Asteroids.Asteroid({
        pos: this.randomPosition(),
        radius: 23 + Math.floor(Math.random() * 25),
        game: this
      }));
    }
  };

  Game.prototype.drawIntro = function(ctx){
    ctx.font = '48px Helvetica Neue';
    ctx.fillStyle = 'white';
    ctx.fillText('Asteroids!', (this.xDim / 2) - 100, (this.yDim / 2) - 80);
    ctx.font = '24px Helvetica Neue';
    ctx.fillText('Press enter to start!', (this.xDim / 2) - 100, (this.yDim / 2) -30);
    ctx.font = '18px Helvetica Neue';
    ctx.fillText("Right/Left to Rotate", (this.xDim / 2) - 80, (this.yDim / 2) + 20);
    ctx.fillText("Up to Accelerate", (this.xDim / 2) - 80, (this.yDim / 2) + 50);
    ctx.fillText("Down to Brake", (this.xDim / 2) - 80, (this.yDim / 2) + 80);
    ctx.fillText("Spacebar to Shoot", (this.xDim / 2) - 80, (this.yDim / 2) + 110);
  };

  Game.prototype.drawLost = function(ctx, img){
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(img, 0, 0);
    ctx.font = '48px Helvetica Neue';
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over!', (this.xDim / 2) - 115, (this.yDim / 2) - 50);
    ctx.font = '24px Helvetica Neue';
    ctx.fillText('Press enter to play again', (this.xDim / 2) - 120, this.yDim / 2);
  };

  Game.prototype.drawWon = function(ctx, img){
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(img, 0, 0);
    ctx.font = '48px Helvetica Neue';
    ctx.fillStyle = 'white';
    ctx.fillText('You Win!', (this.xDim / 2) - 100, (this.yDim / 2) - 50);
    ctx.font = '24px Helvetica Neue';
    ctx.fillText('Press enter to play again', (this.xDim / 2) - 120, this.yDim / 2);
  };

  Game.prototype.draw = function (ctx, img) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(img, 0, 0);
    ctx.textAlign = 'left';
    ctx.font = '20px Helvetica Neue';
    ctx.fillStyle = 'white';
    ctx.fillText("Lives Remaining: " + this.lives, 40, this.yDim - 160);
    ctx.fillText("Right/Left to Rotate", 40, this.yDim - 130);
    ctx.fillText("Up to Accelerate", 40, this.yDim - 100);
    ctx.fillText("Down to Brake", 40, this.yDim - 70);
    ctx.fillText("Spacebar to Shoot", 40, this.yDim - 40);

    this.allObjectsAndExplosions().forEach(function(object) {
      object.draw(ctx, this.canvas);
    }.bind(this));
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.step = function (){
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
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
    if (curY > this.yDim) {
      wrappedPos[1] = curY - this.yDim;
    }

    return wrappedPos;
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          return;
        }
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Sprite){
      this.sprites.splice(this.sprites.indexOf(object), 1);
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > this.xDim) || (pos[1] > this.yDim);
  };
})();
