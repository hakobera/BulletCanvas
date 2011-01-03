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
        var that = command();
        spec = spec || {};

        /**
         * Current command index.
         * @private {integer}
         */
        var commandIndex = 0;

        /**
         * Repeat count.
         * @private {integer}
         */
        var repeatTimes = spec.repeatTimes || 1;
        var repeatCount = repeatTimes;

        /**
         * Last fire direction.
         * @private {float}
         */
        var direction = 0;

        /**
         * Last fire direction.
         * @private {float}
         */
        var speed = 1;

        /**
         * Last fire direction.
         * @private {float}
         */
        var prevFireDirection = spec.prevFireInfo ? spec.prevFireInfo.direction : 0;

        /**
         * Last fire direction.
         * @private {float}
         */
        var prevFireSpeed = spec.prevFireInfo ? spec.prevFireInfo.speed : 1;

        /**
         * Action command list.
         * @private {Array}
         */
        var commands = [];

// init
        var updateContext = spec.updateContext;
        var CommandFactory = require('bulletml/command/commandFactory');
        var commandLength = actionDef.commands.length;
        for (var i = 0; i < commandLength; ++i) {
            var c = actionDef.commands[i];
            var commandType = c.commandType();
            if (commandType === CommandType.FIRE_REF) {
                c = updateContext.findFireDef(c);
            } else if (commandType === CommandType.ACTION_REF) {
                c = updateContext.findActionDef(c);
            }
            commands.push(CommandFactory.createCommand(c));
        }

        /**
         * Execute command.
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
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
                }
            }
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