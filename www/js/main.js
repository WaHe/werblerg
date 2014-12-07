var K = require('kefir');
require('./lib/kefir-jquery');
var Renderer = require('./renderer');
var Incrementer = require('./views/incrementer');

var count = 0;      // We need some app data. Here we just store a count.

function sum(a, b) {
	return a + b;
}

var counterValue = Incrementer.incrementClick.scan(0, sum);

var viewTree = Incrementer.render(count);
var viewEmitter = K.emitter();

Renderer.observe(viewEmitter);

function updateTree(value) {
	viewTree = Incrementer.render(value);
	viewEmitter.emit(viewTree);
}


//updateTree(count);

//counterValue.onValue(updateTree);
