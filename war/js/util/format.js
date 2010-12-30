define(function() {
    var format = function() {
		var msg = arguments[0];
		var len = arguments.length;
		if (len === 1) {
			return msg;
		}
		for (var i = 1; i < len; i += 1) {
            var arg = arguments[i];
            var s, i;
            if (arg instanceof Array) {
                s = '[' + arg.toString() + ']';
            } else {
                s = arg ? arg.toString() : '';
            }
            msg = msg.replace('%' + i, s);
		}
		return msg;
	};

    return format;
});