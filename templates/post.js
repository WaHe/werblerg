module.exports = function (h) {
  var wrapper = require('./wrapper')(h);
  var blog = require('./blog')(h);
  var info = require('./info')(h);

  return function(post) {
    var postContent = h('div.post-content', []);
    postContent.innerHTML = post.html;
    return wrapper(
      post.title,
      blog(
        h('div.post',
          h('div.post-header',
            h('h1.post-title',
              post.title
            ),
            info(post)
          ),
          postContent
        )
      )
    );
  };
};
