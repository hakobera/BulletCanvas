define(['bulletml/command/command'], function(command) {
    /**
     * @constructor
     * @param spec
     */   
    var vanishCommand = function(spec) {
        var that = command(spec);

        /**
         * Execute command.
         * Default implementation do nothing.
         * @param {Object} commandContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(commandContext) {
            var task = commandContext.task;
            var taskSystem = commandContext.taskSystem;
            taskSystem.killTask(task);
            return false;
        };

        return that;
    };

    return vanishCommand;
});