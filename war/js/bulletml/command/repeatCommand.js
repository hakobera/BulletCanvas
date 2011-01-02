define(['bulletml/command/command', 'lib/debug'], function(command, debug) {
    /**
     * @constructor
     * @param spec
     */
    var repeatCommand = function(spec) {
        var that = command(spec);
        var taskSystem = spec.taskSystem;
        var repeat = spec.commandDef;
        var repeatTimes = taskSystem.evalExpression(repeat.times.value) | 0;
        debug(repeatTimes);

        /**
         * Execute command.
         * Default implementation do nothing.
         * @param {Object} commandContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(commandContext) {
            var taskSystem = commandContext.taskSystem;
            taskSystem.addAction(repeat.action, repeatTimes);
            return true;
        };

        return that;
    };

    return repeatCommand;
});