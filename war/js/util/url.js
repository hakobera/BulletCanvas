define(function() {
	var parseParameters = function(url) {
		var map = {};
		var s = url.split('?');
		if (s.length <= 1) {
			return map;
		}
		
		var allParams = url.split('?')[1];
		var params = allParams.split('&');
        var len = params.length;
		for (var i = 0; i < len; ++i) {
			var keyVal = params[i].split('=')
			map[keyVal[0]] = keyVal[1];
		}
		return map;
	};

    var lastPath = function(url) {
        var s = url.split('?');
        var path = s[0];
        var pathParams = path.split('/');
        var lastPath = pathParams[pathParams.length - 1];
        return lastPath;
    };
	
	return {
		params: function(url) {
			return parseParameters(url);
		},

        pathParam: function(url) {
            return lastPath(url);
        }
	};
});