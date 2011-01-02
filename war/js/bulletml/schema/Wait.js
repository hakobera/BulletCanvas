/**
 * Waits.
 * Specifies the number of times.
 */
define(['util/format'], function(format) {
	var wait = function(spec) {
        var that = {};
        that.value = spec.value;

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return 'wait';
        };

        /**
         * Wait frame.
         * @param {Object} commandContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(commandContext) {
                            
            task.kill();
            return false;
        };

        that.toString = function() {
            return format('<Wait value=%1>', that.value);
        };

        return that;
    };

    return wait;
});