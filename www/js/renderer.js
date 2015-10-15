var h = require('virtual-hyperscript');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var DOMDelegator = require('dom-delegator');

var delegator = new DOMDelegator();

// Create an initial root DOM node
var tree = h('div', {});
var rootNode = createElement(tree);
document.body.appendChild(rootNode);

function update(newTree) {
  var patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;
}

function observe(view) {
  view.onValue(update);
}

module.exports = {
  observe: observe
};
