define(function() {
	var parseParameters = function(url) {
		var map = {};
		var s = url.split('?');
		if (s.length <= 1) {
			return map;
		}
		
		var allParams = url.split('?')[1];
		var params = allParams.split('&');
		for (var i = 0; i < params.length; ++i) {
			var keyVal = params[i].split('=')
			map[keyVal[0]] = keyVal[1];
		}
		return map;
	}
	
	return {
		params: function(url) {
			return parseParameters(url);
		}
	};
});