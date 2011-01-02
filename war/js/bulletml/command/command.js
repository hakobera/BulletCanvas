/**
 * command.js - Interface of command.
 */
define(function() {
    var command = function(spec) {
        var that = {};
        var taskSystem = spec.taskSystem;

        /**
         * Execute command.
         * Default implementation do nothing.
         * @param {Object} commandContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(commandContext) {
            return true;
        };

        return that;
    };
    
    return command;
});