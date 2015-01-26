var h = require('hyperscript');
var info = require('./info');

function post(content) {
	var postContent = h('div.post-content', []);
	postContent.innerHTML = content;
	return h('div.post',
		h('h1.post-title',
			"The title of this post is, \"The title of this post.\""
		),
		info(),
		postContent
	);
}

module.exports = post;
