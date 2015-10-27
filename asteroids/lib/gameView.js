( function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.addShip();


  };

  GameView.MOVES = {
    "up": "thrust",
    "left": "rotateLeft",
    "down": "brake",
    "right": "rotateRight",
  };


  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () {
        ship.power(move);
      });
    });

    key("space", function () {
      ship.fireBullet();
    });

  };

  GameView.prototype.start = function () {
    var that = this;
    var img = new Image();
    img.onload = function(){
      this.ctx.drawImage(img, 0, 0);
    }.bind(this);
    img.src = "./BackgroundForAsteroids.png";
    setInterval(function() {
      that.game.step();
      that.game.draw(that.ctx, img);
    }, 20);

    this.bindKeyHandlers();
  };
})();
