module.exports = function (h) {
  var wrapper = require('./wrapper')(h);
  var blog = require('./blog')(h);

  return function(title, text) {
    return wrapper(
      title,
      blog(
        h('div',
          text
        )
      )
    );
  }
};
