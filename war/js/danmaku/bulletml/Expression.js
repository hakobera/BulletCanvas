define(function() {
	
	var replaceVariables = function(expr, params) {
		var e = expr;
		
		// TODO: $1, $2... などのパラメータ置換
		
		while (e.match(/\$rand/)) {
			e = e.replace(/\$rand/, Math.random());
		}
		
		// TODO: $rank を変更できるようにする
		e = e.replace(/\$rank/g, '1');
		
		return e;
	};
	
	return {
		evalExpression: function(expr, params) {
			expr = replaceVariables(expr, params);
			if (expr.match(/[^-()+*\/0-9\. \n\t]/)) {
				throw new BulletMLParseException('Invalid expression: ' + expr);
			}
			return eval(expr);
		}
	};
	
});