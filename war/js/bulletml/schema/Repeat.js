/**
 * Repeats an action.
 * アクションを<times>回繰り返します。
 */
define(['bulletml/command/commandType', 'util/format'], function(CommandType, format) {
	var repeat = function(spec) {
        var that = {};
		that.times = spec.times;
		that.action = spec.action;

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return CommandType.REPEAT;
        };

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            other.times = that.times;
            other.action = that.action.clone();
            return other;
        };

        that.toString = function() {
            return format('<[Repeat times=%1, action=%2>', that.times, that.action);
        };
        
        return that;
	};

    return repeat;
});