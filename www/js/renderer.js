var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

// 1: Create a function that declares what the DOM should look like
function render(count) {
	return h('div', {
		style: {
			textAlign: 'center',
			verticalAlign: 'center',
			lineHeight: (100 + count) + 'px',
			border: '1px solid red',
			width: (100 + count) + 'px',
			height: (100 + count) + 'px'
		},
		className: "test"
	}, [String(count)]);
}

// 2: Initialise the document
var count = 0;      // We need some app data. Here we just store a count.

var tree = render(count);               // We need an initial tree
var rootNode = createElement(tree);     // Create an initial root DOM node ...
//var newTree = render(count);


function reRender(newTree) {
	var patches = diff(tree, newTree);
	rootNode = patch(rootNode, patches);
	tree = newTree;
}
