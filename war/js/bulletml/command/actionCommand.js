/**
 * actionCommand.js - 
 */
define(['bulletml/command/command', 'lib/debug'],
function(command, debug) {

    /**
     * @constructor
     * @param actionDef
     */
    var actionCommand = function(actionDef, spec) {
        var that = command();

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
        var CommandFactory = require('bulletml/command/commandFactory');
        var commandLength = actionDef.commands.length;
        for (var i = 0; i < commandLength; ++i) {
            commands.push(CommandFactory.createCommand(actionDef.commands[i]));
        }

        /**
         * Execute command.
         * @param {Object} task Call action task
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, updateContext) {
            while(commandIndex < commandLength) {
                if (!commands[commandIndex].execute(task, that, updateContext)) {
                    break;
                }
                ++commandIndex;
            }

            if (commandIndex >= commandLength ) {
                --repeatTimes;
                if (repeatTimes > 0) {
                    commandIndex = 0;
                }
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