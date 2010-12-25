define(
['util/scat'],
function(scat) {
	module('scat');
	
	var rad = function(deg) {
		return deg * Math.PI / 180;
	};
	
	test('sin', function() {
		same(scat.sin(0), Math.sin(0));
		same(scat.sin(128), Math.sin(rad(90)));
		same(scat.sin(256), Math.sin(rad(180)));
		same(scat.sin(384), Math.sin(rad(270)));
		same(scat.sin(512), Math.sin(0));
		same(scat.sin(640), Math.sin(rad(90)));
	});

	test('cos', function() {
		same(scat.cos(0), Math.cos(0));
		same(scat.cos(15), Math.cos(rad(90)));
		same(scat.cos(30), Math.cos(rad(180)));
		same(scat.cos(45), Math.cos(rad(270)));
		same(scat.cos(60), Math.cos(0));
		same(scat.cos(75), Math.cos(rad(90)));
	});

	var atan = function(x) {
		return Math.atan(x) * 64 / (Math.PI / 4.0);
	};
	
	test('atan', function() {
		same(scat.atan(1, 1), atan(1));
		//same(scat.atan(1, 5), atan(5));
		//same(scat.atan(1, 10), atan(10));
		//same(scat.atan(1, 20), atan(20));
	});

});