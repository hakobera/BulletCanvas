define(['bulletml/command/command'], function(command) {
    /**
     * @constructor
     * @param vanish {Object} Vanish command definition.
     */
    var vanishCommand = function(vanihs) {
        var that = command();

        /**
         * Execute command.
         * @param {Object} task Call action task
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, updateContext) {
            updateContext.killTask(task);
            return false;
        };

        return that;
    };

    return vanishCommand;
});