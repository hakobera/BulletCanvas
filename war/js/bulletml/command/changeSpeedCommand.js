/**
 * actionCommand.js - 
 */
define(['bulletml/command/command', 'lib/debug'],
function(command, debug) {

    /**
     * @constructor
     * @param {Object} changeSpeedDef
     */
    var changeDirectionCommand = function(changeSpeedDef, spec) {
        var that = command(spec);
        var termFrames = null;
        var deltaSpeed = 0;

        /**
         * Execute command.
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, actionCommand, updateContext) {
            if (termFrames === null) {
                termFrames = updateContext.evalExpression(changeSpeedDef.term.value, actionCommand.getParameters()) | 0;
                var speedDef = changeSpeedDef.speed;
                var changeSpeed = updateContext.evalExpression(speedDef.value);

                if (speedDef.type === 'sequence') {
                    deltaSpeed = changeSpeed;
                } else {
                    switch (speedDef.type) {
                    case 'absolute':
                        changeSpeed -= task.getSpeed();
                        break;

                    case 'relative':
                        //changeSpeed += task.getSpeed();
                        break;
                    }
                    deltaSpeed = changeSpeed / termFrames;
                }
            }
            task.setSpeed(task.getSpeed() + deltaSpeed);
            return --termFrames <= 0;
        };

        /**
         * Reset command.
         */
        that.reset = function() {
            termFrames = null;
            deltaSpeed = 0;
        };

        return that;
    };

    return changeDirectionCommand;
});