/**
 * Waits.
 * Specifies the number of times.
 */
define(['util/format'], function(format) {
	var wait = function(spec) {
        var that = {};
        that.value = spec.value;

        that.toString = function() {
            return format('<Wait value=%1>', that.value);
        };

        return that;
    };

    return wait;
});