define(
['util/messageFormat'],
function(messageFormat) {
	module('MessageFormat');

	test('パラメータなし', function() {
		same(messageFormat.format('message'), 'message');
	});

	
	test('パラメータあり', function() {
		same(messageFormat.format('%1 mes%2sage', 'AAA', 'BBB'), 'AAA mesBBBsage');
	});

}
);

