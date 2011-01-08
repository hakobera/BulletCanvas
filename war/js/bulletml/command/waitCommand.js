define(['bulletml/command/command'], function(command) {
    /**
     * @constructor
     * @param wait {Object} Wait command definition
     */
    var waitCommand = function(wait) {
        var that = command();
        var waitFrames = null;
        
        /**
         * Execute command.
         * 
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return {Boolean} true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, actionCommand, updateContext) {
            if (waitFrames === null) {
                waitFrames = updateContext.evalExpression(wait.value, actionCommand.getReplacementParameters()) | 0;
            }
            return --waitFrames < 0;
        };

        /**
         * Reset command.
         */
        that.reset = function() {
            waitFrames = null;
        };

        return that;
    };

    return waitCommand;
});