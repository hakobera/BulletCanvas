define(
['util/format'],
function(format) {
	module('MessageFormat');

	test('パラメータなし', function() {
		same(format('message'), 'message');
	});

	test('パラメータあり', function() {
		same(format('%1 mes%2sage', 'AAA', 'BBB'), 'AAA mesBBBsage');
	});

    test('配列', function() {
        var array = [1, 2, 3];
        same(format('%1', array), '[1,2,3]');
    });
}
);

