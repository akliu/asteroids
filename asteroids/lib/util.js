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

  // Find distance between two points.
  Asteroids.Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  // Find the length of the vector.
  Asteroids.Util.norm = function (vec) {
    return Asteroids.Util.dist([0, 0], vec);
  };

  // Scale the length of a vector by the given amount.
  Asteroids.Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  // Normalize the length of the vector to 1, maintaining direction.
  Asteroids.Util.dir = function (vec) {
    var norm = Asteroids.Util.norm(vec);
    return Asteroids.Util.scale(vec, 1 / norm);
  };

})();
