/**
 * command.js - Interface of command.
 */
define(function() {
    var command = function() {
        var that = {};

        /**
         * Execute command.
         * Default implementation do nothing.
         * @param {Object} task Call action task
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, updateContext) {
            return true;
        };

        return that;
    };
    
    return command;
});