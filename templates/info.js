var h = require('hyperscript');

function info() {
	return h('div.info',
		h('div.info-date',
			"1/15/15"
		),
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
	);
}

module.exports = info;
