/**
 * actionCommand.js - 
 */
define(['bulletml/command/command', 'lib/debug'],
function(command, debug) {

    /**
     * @constructor
     * @param changeDirectionDef
     */
    var changeDirectionCommand = function(changeDirectionDef, spec) {
        var that = command(spec);
        var termFrames = null;
        var deltaAngle = 0;

        /**
         * Execute command.
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, actionCommand, updateContext) {
            if (termFrames === null) {
                termFrames = updateContext.evalExpression(changeDirectionDef.term.value, actionCommand.getParameters()) | 0;
                var direction = changeDirectionDef.direction;
                var d = updateContext.evalExpression(direction.value);
                var changeAngle = d * Math.PI / 180;

                if (direction.type === 'sequence') {
                    deltaAngle = changeAngle;
                } else {
                    switch (direction.type) {
                    case 'aim':
                        changeAngle = changeAngle + updateContext.getAimAngle(task.getX(), task.getY()) - task.getDirection();
                        break;

                    case 'absolute':
                        changeAngle = changeAngle - task.getDirection() + Math.PI;
                        break;

                    case 'relative':
                        changeAngle = -changeAngle;
                        break;
                    }
                    
                    if (changeAngle > Math.PI) {
                        changeAngle -= (2 * Math.PI);
                    }
                    if (changeAngle < -Math.PI) {
                        changeAngle += (2 * Math.PI);
                    }
                    deltaAngle = changeAngle / termFrames;
                }
            }
            task.setDirection(task.getDirection() + deltaAngle);
            return --termFrames <= 0;
        };

        /**
         * Reset command.
         */
        that.reset = function() {
            termFrames = null;
            deltaAngle = 0;
        };

        return that;
    };

    return changeDirectionCommand;
});