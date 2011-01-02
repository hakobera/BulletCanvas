define(
[
    'bulletml/expression',
    'lib/debug'
],
function(Expression, debug) {
    module('expression');

    var expression = Expression();
    
   	test('数式のみ', function() {
		same(expression.eval('1+9'), 10);
		same(expression.eval('9-2'), 7);
		same(expression.eval('1*9'), 9);
		same(expression.eval('2/5'), 0.4);
	});

	test('$rank を含む', function() {
		same(expression.eval('1+9+$rank'), 11);
		same(expression.eval('9-2-$rank'), 6);
		same(expression.eval('$rank+1*9'), 10);
		same(expression.eval('2*$rank/5'), 0.4);

        expression.setRank(2);
        same(expression.eval('1+9+$rank'), 12);
        same(expression.eval('9-2-$rank'), 5);
        same(expression.eval('$rank+1*9'), 11);
        same(expression.eval('2*$rank/5'), 0.8);
	});

	test('$radom を含む', function() {
		notStrictEqual(expression.eval('1+9+$rand'), 10);
	});

	test('$1, $2 形式のパラメータ', function() {
		same(expression.eval('$1+1*$2+$1', [10, 5]), 25);
	});
    
});