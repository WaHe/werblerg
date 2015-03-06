module.exports = function (h) {
	return function(content) {
		return h('div.container',
			h('div.header',
				h('a',
					{
						href: "/",
						title: "Walker Henderson"
					},
					h('div.header-image')
				),
				h('div.header-bar',
					h('div.header-title',
						"Walker Henderson's Blog"
					),
					h('div.header-subtitle',
						"He writes about stuff and pretends that he's smart."
					)
				)
			),
			content,
			h('div.copyright',
				"Copyright © " + new Date().getFullYear() + " Walker Henderson"
			)
		)
	}
};
