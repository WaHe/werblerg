var h = require('hyperscript');
var info = require('./info');

function listing() {
	return h('div.listing',
		function () {
			var ret = [];
			for (var i = 0; i < 10; i++) {
				ret.push(
					h('div.item',
						h('a.item-title', {href: '#'},
							"Awesome post of awesomeness"
						),
						h('div.item-synopsis',
							"I detail the details of how detailed every thing is, isn't that just great? "
							+ "Things are just awesome now that you're going to read this post."
						),
						info()
					)
				);
			}
			return ret;
		}(),
		h('div.loading',
			h('div.loading-wrapper-left.loading-wrapper',
				h('div.loading-ball-left.loading-ball')
			),
			h('div.loading-wrapper-right.loading-wrapper',
				h('div.loading-ball-right.loading-ball')
			)
		)
	);
}

module.exports = listing;
