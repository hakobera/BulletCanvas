define(['bulletml/command/command'], function(command) {
    /**
     * @constructor
     * @param spec
     */
    var waitCommand = function(spec) {
        var that = command(spec);
        var taskSystem = spec.taskSystem;
        var wait = spec.commandDef;
        var waitFrames = taskSystem.evalExpression(wait.value) | 0;

        /**
         * Execute command.
         * Default implementation do nothing.
         * @param {Object} commandContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(commandContext) {
            return --waitFrames < 0;
        };

        return that;
    };

    return waitCommand;
});