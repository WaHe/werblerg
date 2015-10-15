module.exports = function (h) {
  var info = require('./info')(h);
  return function(post) {
    var postContent = h('div.post-content', []);
    postContent.innerHTML = post.html;
    return h('div.post',
      h('div.post-header',
        h('h1.post-title',
          post.title
        ),
        info(post)
      ),
      postContent
    );
  }
};
