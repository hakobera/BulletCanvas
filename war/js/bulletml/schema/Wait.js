/**
 * Waits.
 * Specifies the number of times.
 */
define(['util/messageFormat'], function(fmt) {
	var wait = function(spec) {
        var that = {};
        that.value = spec.value;

        that.toString = function() {
            return fmt.format('[Wait] value=%1', that.value);
        };

        return that;
    };

    return wait;
});