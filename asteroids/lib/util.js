( function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Util = {};

  Asteroids.Util.inherits = function (child, parent) {
    function Surrogate () {}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate ();
    child.prototype.constructor = child;
  };

  Asteroids.Util.randomVelocity = function (magnitude){
    var magnitude = magnitude;
    if (typeof magnitude === "undefined"){
      magnitude = 10;
    }

    var sign = function () {
      var temp = Math.floor((Math.random() - 0.5));
      if (temp === 0) {
        temp = 1;
      }
      return temp;
    };

    return [(magnitude * Math.random() * sign()), (magnitude * Math.random() * sign())];
  };

})();
