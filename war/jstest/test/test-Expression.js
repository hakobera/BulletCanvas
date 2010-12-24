define(
['danmaku/bulletml/Expression'],
function(Expression) {
	module('Expression');
	
	test('数式のみ', function() {
		same(Expression.evalExpression('1+9'), 10);
		same(Expression.evalExpression('9-2'), 7);
		same(Expression.evalExpression('1*9'), 9);
		same(Expression.evalExpression('2/5'), 0.4);
	});
	
	test('$rank を含む', function() {
		same(Expression.evalExpression('1+9+$rank'), 11);
		same(Expression.evalExpression('9-2-$rank'), 6);
		same(Expression.evalExpression('$rank+1*9'), 10);
		same(Expression.evalExpression('2*$rank/5'), 0.4);
	});
	
	test('$radom を含む', function() {
		notStrictEqual(Expression.evalExpression('1+9+$rand'), 10);
	});

});