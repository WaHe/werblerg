var h = require('hyperscript');

function blog() {
	return h('div.container',
		h('div.block.top-level'),
		h('div.block.mid-level'),
		h('div.block.bottom-level',
			function(){
				var a = "";
				var b = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
				for(var i = 0; i < 20; i ++) {
					a += b;
				}
				return a;
			}()
		)
	)
}

module.exports = blog;
