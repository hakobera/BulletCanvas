define(['bulletml/command/command', 'lib/debug'], function(command, debug) {
    /**
     * @constructor
     * @param repeat {Object} Repeat command definition
     */
    var repeatCommand = function(repeat) {
        var that = command();

        /**
         * Execute command.
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, actionCommand, updateContext) {
            var repeatTimes = updateContext.evalExpression(repeat.times.value) | 0;
            var action = updateContext.createAction(repeat.action, {
                repeatTimes: repeatTimes
            });
            task.setAction(action);
            return true;
        };

        return that;
    };

    return repeatCommand;
});