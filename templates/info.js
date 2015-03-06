module.exports = function (h) {
	return function(post) {
		return h('div.info',
			h('div.info-date',
				post.datestring
			)
			/*,
			 h('div.info-categories',
			 h('a.info-category', {href: '#'},
			 "Art"
			 ),
			 h('a.info-category', {href: '#'},
			 "Music"
			 ),
			 h('a.info-category', {href: '#'},
			 "Programming"
			 ),
			 h('a.info-category', {href: '#'},
			 "Talking about stuff that's stuff"
			 )
			 )
			 */
		);
	}
};
