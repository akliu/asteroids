( function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.addShip();
    this.recharge = 0;
    this.img = new Image();

    this.img.onload = function(){
      this.ctx.drawImage(this.img, 0, 0);
    }.bind(this);
    this.img.src = "./space-stars.jpg";
  };


  GameView.prototype.preventScrolling = function() {
  window.addEventListener("keydown", function(e) {
    // space and arrow keys

    if(e.keyIdentifier === "Up" || e.keyIdentifier === "Down" ||
        e.keyIdentifier === "Left" || e.keyIdentifier === "Right"){
          e.preventDefault();
        }
      });
  };

  // GameView.prototype.startGame = function(){
  //   var that = this;
  //   window.addEventListener("keydown", function(e){
  //     debugger
  //     e.preventDefault();
  //     if(e.keyIdentifier === "U+0020"){
  //       that.gameStarted();
  //       that.start();
  //     }
  //
  //   });
  // };
  //
  // GameView.prototype.gameStarted = function(){
  //   window.removeEventListener("keydown", function(e){
  //     // debugger
  //     e.preventDefault();
  //     if(e.keyIdentifier === "U+0020"){
  //       that.start();
  //       that.gameStarted();
  //     }
  //
  //   });
  // };

  GameView.prototype.keyInput = function () {
    if (key.isPressed('up')) {
      this.ship.power("thrust");
    }
    if (key.isPressed('down')) {
      this.ship.power("brake");
    }
    if (key.isPressed('left')) {
      this.ship.power("rotateLeft");
    }
    if (key.isPressed('right')) {
      this.ship.power("rotateRight");
    }
    if (key.isPressed('space')) {
      if (this.recharge === 0){
        this.ship.fireBullet();
        this.recharge = 3;
      }
    }
  };

  GameView.prototype.intro = function () {
    var that = this;
    // var img = new Image();
    // img.onload = function(){
    //   this.ctx.drawImage(img, 0, 0);
    // }.bind(this);
    // img.src = "./space-stars.jpg";



    var watchForSpace = setInterval(function(){
      // that.ctx.font = '48px Helvetica Neue';
      // that.ctx.fillStyle = 'white';
      // that.ctx.fillText('Asteroids!', 500, 500);
      // that.ctx.font = '24px Helvetica Neue';
      // that.ctx.fillText('Press space to start!', 500, 600);
      that.game.drawIntro(that.ctx);
      if (key.isPressed('enter')){
        that.start();
        clearInterval(watchForSpace);
      }
    }, 20);
  };

  GameView.prototype.start = function () {
    var that = this;
    // var img = new Image();
    // img.onload = function(){
    //   this.ctx.drawImage(img, 0, 0);
    // }.bind(this);
    // img.src = "./space-stars.jpg";
    var won = false;

    setInterval(function() {
      if((that.game.lives >= 0) && (!won)){
        if(that.recharge > 0){
          that.recharge -= 1;
        }
        that.keyInput();
        that.game.step();
        that.game.draw(that.ctx, that.img);
        won = that.game.won();
      }else {
        if(won){
          that.game.drawWon(that.ctx, that.img);
        }else {
          that.game.drawLost(that.ctx, that.img);
        }
        if(key.isPressed('enter')){
          won = false;
          that.game = new Asteroids.Game(document.getElementById("game-canvas"));
          that.ship = that.game.addShip();
        }
      }
    }, 20);

     this.preventScrolling();
  };
})();
