var Rx = {
  Emitter: function(data) {
    this.observers = [];
    this.data = data;
    this.emit = function() {
      for (var o in this.observers) {
        this.observers[o](this.data);
      }
    };
    this.observe = function(o) {
      this.observers.push(o);
    };
  },
  Or: function(a, b) {
    this.observers = [];
    var callback = function(data) {
      for (var o in this.observers) {
        this.observers[o](data);
      }
    }.bind(this);
    a.observe(callback);
    b.observe(callback);
    this.observe = function(o) {
      this.observers.push(o);
    };
  }
};

module.exports = Rx;
