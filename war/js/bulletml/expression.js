define(
function(fmt) {
	var replaceVariables = function(expr, params) {
		var e = new String(expr);

		if (params) {
			// TODO: precompile
			var len = params.length;
			for (var i = 0; i < len; ++i) {
				var p = new RegExp('\\$' + (i+1), 'g');
				e = e.replace(p, params[i]);
			}
		}

		while (e.match(/\$rand/)) {
			e = e.replace('$rand', Math.random());
		}

		// TODO: $rank を変更できるようにする
		e = e.replace(/\$rank/g, '1');

		return e;
	};

	return {
		evalExpression: function(expr, params) {
			var e = replaceVariables(expr, params);
			if (e.match(/[^-()+*\/0-9\. \n\t]/)) {
				throw new BulletMLParseException('Invalid expression: eval = ' + e +  ', src = ' + expr);
			}
			return eval(e);
		}
	};
});