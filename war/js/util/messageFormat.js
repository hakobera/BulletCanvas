define({
	format: function() {
		var msg = arguments[0];
		var len = arguments.length;
		if (len === 1) {
				return msg;
		}
		for (var i = 1; i < len; i += 1) {
            var arg = arguments[i];
			msg = msg.replace('%' + i, arg ? arg.toString() : '');
		}
		return msg;
	}
});