/**
 * Specifies the number of times.
 * 繰り返し回数を指定します。
 */
define(['util/format'], function(format) {
	var times = function(spec) {
        var that = {};
        that.value = spec.value;

        that.toString = function() {
            return format('<Times value=%1>', that.value);
        };

        return that;
	};

    return times;
});