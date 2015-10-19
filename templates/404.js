module.exports = function (h) {
  var wrapper = require('./wrapper')(h);
  var blog = require('./blog')(h);

  return function(title) {
    return wrapper(
      title,
      blog(
        h('div',
          "Sorry, but this page was not available."
        )
      )
    );
  }
};
