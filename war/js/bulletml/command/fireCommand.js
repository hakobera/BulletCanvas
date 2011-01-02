define(['bulletml/command/command', 'lib/debug'], function(command, debug) {
    /**
     * @constructor
     * @param spec
     */
    var fireCommand = function(spec) {
        var that = command(spec);
        var fireDef = spec.commandDef;
        debug(fireDef);

        /**
         * Execute command.
         * Default implementation do nothing.
         * @param {Object} commandContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(commandContext) {
            var taskSystem = commandContext.taskSystem;
            taskSystem.addBullet(fireDef.bullet);
            return true;
        };

        return that;
    };

    return fireCommand;
});