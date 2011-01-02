define(
['util/fmath'],
function(fmath) {
	module('fmath');
	
	var rad = function(deg) {
		return deg * Math.PI / 180;
	};
	
	test('sin', function() {
		same(fmath.sin(0), Math.sin(0));
		same(fmath.sin(128), Math.sin(rad(90)));
		same(fmath.sin(256), Math.sin(rad(180)));
		same(fmath.sin(384), Math.sin(rad(270)));
		same(fmath.sin(512), Math.sin(0));
		same(fmath.sin(640), Math.sin(rad(90)));
	});

	test('cos', function() {
		same(fmath.cos(0), Math.cos(0));
		same(fmath.cos(15), Math.cos(rad(90)));
		same(fmath.cos(30), Math.cos(rad(180)));
		same(fmath.cos(45), Math.cos(rad(270)));
		same(fmath.cos(60), Math.cos(0));
		same(fmath.cos(75), Math.cos(rad(90)));
	});

	var atan = function(x) {
		return Math.atan(x) * 64 / (Math.PI / 4.0);
	};
	
	test('atan', function() {
		same(fmath.atan(1, 1), atan(1));
		//same(fmath.atan(1, 5), atan(5));
		//same(fmath.atan(1, 10), atan(10));
		//same(fmath.atan(1, 20), atan(20));
	});

});