Hello, Internet. I've been working on this blog off-and-on since October and I think it's about time it became "self-hosting."

Why
---
I've wanted to blog about a number of things, especially programming, for a while. Hopefully people will read my posts and get something out of them.

One goal I had with this project was to build the site from scratch, at least for the most part. I know that all kinds of blogging software and static site generators already exist, but I wanted to try to work through some of the problems that come with making a site like this, even if those problems have already been solved many times.

How
---
It's written in JavaScript and uses the Express.js web framework. All of the templates are written using [HyperScript](https://github.com/dominictarr/hyperscript). Posts are written in Markdown and rendered into HTML when they are submitted.

One feature I knew I wanted to have was mathematical notation support. You can $\omega rite^{\alpha ny}\LaTeX$ that can be rendered by MathJax. Rather than rendering math after the page is loaded, the LaTeX is parsed by MathJax and rendered as SVGs when submitting a post. This allows the equations to scale gracefully, but SVGs are not very efficient size-wise. I may change this system to render to PNGs.

All of this is run using Node.js, PM2, Nginx and PostgreSQL.

The Future
----------
I'd like to write new posts as frequently as makes sense, hopefully once a week or so. I also have lots of ideas for new features. Maybe I'll change the design, too. But for the moment, all the basic functionality is here. Time to get started!