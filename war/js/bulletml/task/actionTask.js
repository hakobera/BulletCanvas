/**
 * actionTask.js - Task for action.
 */
define(
[
    'task/task',
    'bulletml/command/commandFactory',
    'lib/debug'
],
function(task, CommandFactory, debug) {

    /**
     * @constructor
     * @param spec
     */
    var actionTask = function(spec) {
        var that = task(spec);

        /**
         * Current command index.
         * @private {integer}
         */
        var currentIndex = 0;

        /**
         * Repeat count.
         * @private {integer}
         */
        var repeatTimes = spec.repeatTimes || 1;

        /**
         * Last fire direction.
         * @private {float}
         */
        var prevFireDirection = 0;

        /**
         * Last fire direction.
         * @private {float}
         */
        var prevFireSpeed = 1;

        /**
         * Action command list.
         * @private {Array}
         */
        var commands = [];

// init
        var actionDef = spec.actionDef;
        var commandLength = actionDef.commands.length;
        for (var i = 0; i < commandLength; ++i) {
            commands.push(CommandFactory.createCommand(actionDef.commands[i]));
        }

// public methods
        /**
         * Return type of this task.
         * @return {String} 'action'
         */
        that.type = function() {
            return 'action';
        };

       /**
         * Update task properties, status, etc.
         * Default implementation do nothing.
         * @public
         * @param updateContext {Object} Context for update object.
         */
        that.update = function(updateContext) {
            while(currentIndex < commandLength) {
                var command = commands[currentIndex];
                var doNext = command.execute(that, updateContext);
                if (!doNext) {
                    break;
                }
                ++currentIndex;
            }

            if (currentIndex === commandLength ) {
                --repeatTimes;
                if (repeatTimes > 0) {
                    currentIndex = 0;
                } else {
                    updateContext.killTask(that);
                }
            }
        };

        /**
         * Save last fire direction.
         * @public
         * @param direction {integer} last fire direction(degree)
         */
        that.setLastFireDirection = function(direction) {
            lastFireDirection = direction;
        };

        debug('Create ' + that.type() + ':' + that.id());

        return that;
    };

    return actionTask;
});