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
         * @private
         */
        var currentIndex = 0;

        /**
         * Repeat count.
         * @private
         */
        var repeatTimes = spec.repeatTimes || 1;

        debug(repeatTimes);
        console.log(repeatTimes);
        
        var taskSystem = spec.taskSystem;
        var actionDef = spec.actionDef;
        var commands = [];
        var commandLength = actionDef.commands.length;
        
        for (var i = 0; i < commandLength; ++i) {
            commands.push(CommandFactory.createCommand(actionDef.commands[i], taskSystem));
        }
        debug(commands);

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
                var doNext = command.execute({
                    task: that,
                    taskSystem: updateContext.taskSystem
                });
                if (!doNext) {
                    break;
                }
                ++currentIndex;
            }

            if (currentIndex === commandLength ) {
                --repeatTimes;
                if (repeatTimes > 0) {
                    currentIndex = 0;
                }
            }
        };

        debug('Create ' + that.type() + ':' + that.id());

        return that;
    };

    return actionTask;
});