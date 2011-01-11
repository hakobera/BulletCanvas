define(['bulletml/command/command', 'lib/debug'], function(command, debug) {
    /**
     * @constructor
     * @param repeat {Object} Repeat command definition
     */
    var repeatCommand = function(repeat, spec) {
        var that = command(spec);

        /**
         * Execute command.
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, actionCommand, updateContext) {
            var repeatTimes = updateContext.evalExpression(repeat.times.value, actionCommand.getParameters()) | 0;
            var action = updateContext.createAction(repeat.action, {
                repeatTimes: repeatTimes,
                parameters: actionCommand.getParameters()
            });
            task.setAction(action);
            return true;
        };

        return that;
    };

    return repeatCommand;
});