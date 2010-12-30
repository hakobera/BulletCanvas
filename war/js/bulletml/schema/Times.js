/**
 * Specifies the number of times.
 * 繰り返し回数を指定します。
 */
define(['util/messageFormat'], function(fmt) {
	var times = function(spec) {
        var that = {};
        that.value = spec.value;

        that.toString = function() {
            return fmt.format('[Times] value=%1', that.value);
        };

        return that;
	};

    return times;
});