module.exports = function (h) {
  return function(content) {
    return h('div.container',
      h('div.header',
        h('a',
          {
            href: "/",
            title: "Walker's Blog"
          },
          h('div.header-image')
        ),
        h('div.header-bar',
          h('div.header-title',
            "Walker's Blog"
          ),
          h('div.header-subtitle',
            "Assorted thoughts."
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
