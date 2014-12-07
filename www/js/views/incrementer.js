var K = require('kefir');
var h = require('virtual-hyperscript');

var incrementClick = K.emitter();

function render(size)  {
	return h('div', {}, [
		h('button', {
			'ev-click': function (ev) {incrementClick.emit(1)}
		}, '+'),
		h('span', {}, ["" + size]),
		h('button', {
			'ev-click': function (ev) {incrementClick.emit(-1)}
		}, '-'),
		h('div', {
			style: {
				textAlign: 'center',
				verticalAlign: 'center',
				lineHeight: (100 + size) + 'px',
				border: '1px solid red',
				width: (100 + size) + 'px',
				height: (100 + size) + 'px'
			}
		}, [String(size)])
	]);
}

module.exports = {
	render: render,
	incrementClick: incrementClick
};
