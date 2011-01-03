/**
 * Waits.
 * Specifies the number of times.
 */
define(['bulletml/command/commandType', 'util/format'], function(CommandType, format) {
	var wait = function(spec) {
        var that = {};
        that.value = spec.value;

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return CommandType.WAIT;
        };

        that.toString = function() {
            return format('<Wait value=%1>', that.value);
        };

        return that;
    };

    return wait;
});