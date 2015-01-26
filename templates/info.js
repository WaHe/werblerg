var h = require('hyperscript');

function info() {
	return h('div.info',
		h('div.info-date',
			"1/15/15"
		),
		h('div.info-categories',
			"Art, Music, Programming, Talking about stuff that's stuff"
		)
	);
}

module.exports = info;
