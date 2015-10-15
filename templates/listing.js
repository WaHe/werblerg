module.exports = function (h) {
	var wrapper = require('./wrapper')(h);
	var blog = require('./blog')(h);
	var info = require('./info')(h);

	return function(title, posts) {
		return wrapper(
			title,
			blog(
				h('div.listing',
					function () {
						var ret = [];
						for (var i = 0; i < posts.length; i++) {
							var post = posts[i];
							ret.push(
								h('div.item',
									h('a.item-title', {href: '/post/' + post.id},
										post.title
									),
									h('div.item-synopsis',
										post.synopsis
									),
									info(post)
								)
							);
						}
						return ret;
					}()
				)
			)
		);
	}
};
