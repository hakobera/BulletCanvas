define(
['util/url'],
function(url) {
	module('util::url');

	test('No parameter', function() {
		var map = url.params('http://test.com/1223');
		same(map, {});
	});

	test('One parameter', function() {
		var map = url.params('http://test.com/1223?a=b');
		same(map, { a:'b' });
	});

	test('Multiple parameter', function() {
		var map = url.params('http://test.com/1223?a=b&c=d');
		same(map, { a:'b', c:'d' });
	});

	test('Multiple parameter with no value', function() {
		var map = url.params('http://test.com/1223?a=&c=d');
		same(map, { a:'', c:'d' });
	});

}
);

