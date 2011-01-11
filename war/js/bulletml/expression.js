define(['lib/debug'], function(debug) {
    /**
     * Replace variables.
     * @private
     * @return {String} expression
     */
    var replaceVariables = function(expr, rank, params) {
        var e = new String(expr);

        if (params && params.length > 0) {
            var len = params.length;
            for (var i = 0; i < len; ++i) {
                var p = new RegExp('\\$' + (i+1), 'g');
                e = e.replace(p, params[i]);
            }
        }

        while (e.match(/\$rand/)) {
            e = e.replace('$rand', Math.random());
        }

        e = e.replace(/\$rank/g, rank);

        return e;
    };

    /**
     * @constructor
     */
    var expression = function(rank) {
        var that = {};

        /**
         * Bullet difficulty rank.
         * @private {integer}
         */
        rank = rank || 1;

        /**
         * Set rank.
         * @param v {integer} rank value
         */
        that.setRank = function(v) {
            rank = v;  
        };

        /**
         * Evaluate expression
         * @param expressionString {String} Expression string
         * @param params {Array} parameters
         */
        that.eval = function(expressionString, params) {
            var expr = replaceVariables(expressionString, rank, params);
            // TODO: 不正構文チェックの強化
            debug('eval = ' + expr +  ', src = ' + expressionString + ', params = ' + params);
            if (expr.match(/[^-()+*\/0-9\. \n\t]/)) {
                throw new Error('[expression] Invalid expression: eval = ' + expr +  ', src = ' + expressionString);
            }
            return eval(expr);
        }

        return that;
    };

	return expression;
});