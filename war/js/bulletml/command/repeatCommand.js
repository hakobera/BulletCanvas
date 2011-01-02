define(['bulletml/command/command', 'lib/debug'], function(command, debug) {
    /**
     * @constructor
     * @param repeat {Object} Repeat command definition
     */
    var repeatCommand = function(repeat) {
        var that = command();

        /**
         * Execute command.
         * @param {Object} task Call action task
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, updateContext) {
            var repeatTimes = updateContext.evalExpression(repeat.times.value) | 0;
            updateContext.addAction(repeat.action, repeatTimes);
            return true;
        };

        return that;
    };

    return repeatCommand;
});