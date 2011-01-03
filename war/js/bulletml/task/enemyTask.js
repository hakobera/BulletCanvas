/**
 * playerTask.js - Task for player.
 */
define(['bulletml/task/displayObjectTask', 'bulletml/task/taskType', 'lib/debug'],
function(displayObjectTask, TaskType, debug) {
    var enemyTask = function(spec) {
        var that = displayObjectTask(spec);

        /**
         * @private
         */
        var currentAction;

        /**
         * Return type of this task.
         * @return {String} 'action'
         */
        that.type = function() {
            return TaskType.ENEMY;
        };

       /**
         * Update task properties, status, etc.
         * @public
         * @param updateContext {Object} Context for update object.
         */
        that.update = function(updateContext) {
            if (currentAction) {
                currentAction.execute(that, updateContext);
            }
        };

        /**
         * Draw an object related this task.
         * @public
         * @param drawContext Context for drawing object.
         */
        that.draw = function(drawContext) {
            drawContext.drawCircle(that.getX(), that.getY(), 5, '#f00');
        };

        /**
         * Set action.
         */
        that.setAction = function(action) {
            currentAction = action;
        };

        debug('Create ' + that.type() + ':' + that.id());
        
        return that;
    };

    return enemyTask;
});