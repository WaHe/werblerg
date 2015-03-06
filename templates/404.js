module.exports = function (h) {
	return function() {
		return h('div',
			"Sorry, but this page was not available.",
			h('a', {href: '/images/dsfads'}, 'testestes')
		);
	}
};
