//var h = require('virtual-dom/h');
//var diff = require('virtual-dom/diff');
//var patch = require('virtual-dom/patch');
//var createElement = require('virtual-dom/create-element');
//
//Rx = require('./observe');
//
//var test = ["test"];
//var x = new Rx.Emitter(test);
//x.observe(function(data){console.log("got this event! " + data)});
//test.push("thing");
//x.emit();
//var y = new Rx.Emitter(test);
//var or = new Rx.Or(x, y);
//or.observe(function(data){console.log("or worked! " + data)});
//x.emit();
//y.emit();
var Kefir = require('kefir');
var $ = require('jquery');
require('./lib/kefir-jquery');


var plusClicks = $('#plus-btn').asKefirStream('click');
var minusClicks = $('#minus-btn').asKefirStream('click');

var counterChanges = Kefir.merge(
	plusClicks.mapTo(1),
	minusClicks.mapTo(-1)
);

function sum(a, b) {
	return a + b;
}

var counterValue = counterChanges.scan(0, sum);

counterValue.onValue(['text', $('#result')]);

$('#test').css('background-color', 'red');
