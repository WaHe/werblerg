var h = require('hyperscript');

function wrapper(content) {
	return h('html',
		h('head', {lang: 'en'},
			h('meta', {charset: 'UTF-8'}),
			h('meta', {
				name: 'viewport',
				content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
			}),
			h('title', 'testing 123!'),
			h('link', {
				rel: 'stylesheet',
				type: 'text/css',
				href: 'public/style.css'
			})
		),
		h('body',
			content
		)
	)
}

module.exports = wrapper;
