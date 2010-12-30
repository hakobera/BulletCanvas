/**
 * Repeats an action.
 * アクションを<times>回繰り返します。
 */
define(['util/messageFormat'], function(fmt) {
	var repeat = function(spec) {
        var that = {};
		that.times = spec.times;
		that.action = spec.action;

        that.toString = function() {
            return fmt.format('[Repeat] times=%1, action=%2', that.times, that.action);
        };
        
        return that;
	};

    return repeat;
});