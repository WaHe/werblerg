module.exports = function (h) {
  return function(title, content) {
    return h('html',
      h('head', {lang: 'en'},
        h('meta', {charset: 'UTF-8'}),
        h('meta', {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        }),
        h('title', title),
        h('link', {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/public/style.css'
        }),
        h('link', {
          rel: 'stylesheet',
          type: 'text/css',
          href: '//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min.css'
        })
      ),
      h('body',
        content
      )
    )
  }
};
