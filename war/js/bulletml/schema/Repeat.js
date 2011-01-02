/**
 * Repeats an action.
 * アクションを<times>回繰り返します。
 */
define(['util/format'], function(format) {
	var repeat = function(spec) {
        var that = {};
		that.times = spec.times;
		that.action = spec.action;

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return 'repeat';
        };

        that.toString = function() {
            return format('<[Repeat times=%1, action=%2>', that.times, that.action);
        };
        
        return that;
	};

    return repeat;
});