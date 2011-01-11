/**
 * actionCommand.js - 
 */
define(['bulletml/command/command', 'bulletml/command/commandType', 'lib/debug'],
function(command, CommandType, debug) {

    /**
     * @constructor
     * @param actionDef
     */
    var actionCommand = function(actionDef, spec) {
        spec = spec || {};

        var that = command(spec);

        /**
         * Current command index.
         * @private {int}
         */
        var commandIndex = 0;

        /**
         * Repeat count.
         * @private {int}
         */
        var repeatTimes = spec.repeatTimes || 1;
        var repeatCount = repeatTimes;

        /**
         * Last fire direction.
         * @private {Number}
         */
        var direction = 0;

        /**
         * Last fire direction.
         * @private {Number}
         */
        var speed = 1;

        /**
         * Last fire direction.
         * @private {Number}
         */
        var prevFireDirection = spec.prevFireInfo ? spec.prevFireInfo.direction : 0;

        /**
         * Last fire direction.
         * @private {Number}
         */
        var prevFireSpeed = spec.prevFireInfo ? spec.prevFireInfo.speed : 1;

        /**
         * Action command list.
         * @private {Array}
         */
        var commands = [];

// init
        var i, c, commandType;
        var updateContext = spec.updateContext;
        var commandLength = actionDef.commands.length;
        var actionParameters = that.getParameters();
        console.log('action constructor ' + actionParameters);
        for (i = 0; i < commandLength; ++i) {
            commands.push(updateContext.createCommand(actionDef.commands[i], actionParameters));
        }

        /**
         * Execute command.
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return {boolean} true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, actionCommand, updateContext) {
            while(!that.isFinished()) {
                if (!commands[commandIndex].execute(task, that, updateContext)) {
                    break;
                }
                ++commandIndex;
            }

            if (that.isFinished()) {
                --repeatCount;
                if (repeatCount > 0) {
                    commandIndex = 0;
                    for (var i = 0; i < commandLength; ++i) {
                        commands[i].reset();
                    }
                }
            }
            
            return that.isFinished() && repeatCount <= 0;
        };

        /**
         * Return if all commands is finished.
         * @return {boolean} true if all commands is finished.
         */
        that.isFinished = function() {
            return commandIndex >= commandLength;
        };

        /**
         * Reset status.
         */
        that.reset = function() {
            commandIndex = 0;
            repeatCount = repeatTimes;
            for (var i = 0; i < commandLength; ++i) {
                commands[i].reset();
            }
        };

        /**
         * Return current direction.
         * @public
         */
        that.getCurrentDirection = function() {
            return direction;
        };

        /**
         * Return current speed.
         * @public
         */
        that.getCurrentSpeed = function() {
            return speed;
        };

        /**
         * Return last fire direction.
         * @public
         */
        that.getPrevFireDirection = function() {
            return prevFireDirection;
        };

        /**
         * Return last fire speed.
         * @public
         */
        that.getPrevFireSpeed = function() {
            return prevFireSpeed;
        };

        /**
         * Set last fire direction.
         * @public
         */
        that.setPrevFireDirection = function(direction) {
            prevFireDirection = direction;
        };

        /**
         * Set last fire speed.
         * @public
         */
        that.setPrevFireSpeed = function(speed) {
            prevFireSpeed = speed;
        };

        return that;
    };

    return actionCommand;
});