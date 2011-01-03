/**
 * playerTask.js - Task for player.
 */
define(['bulletml/task/displayObjectTask', 'bulletml/task/taskType', 'lib/debug'],
function(displayObjectTask, TaskType, debug) {
    var enemyTask = function(spec) {
        var that = displayObjectTask(spec);

        var PI2 = Math.PI * 2;

        /**
         * Current action related this task.
         * @private
         */
        var currentAction;

        /**
         * Current speed.
         * @private
         */
        var currentSpeed = 1;

        /**
         * Current direction.
         * @private
         */
        var currentDirection = 0;

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
                currentAction.execute(that, currentAction, updateContext);
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
         * Return if action is finished.
         * @return {boolean} true if action is finished.
         */
        that.isIdle = function() {
            return currentAction.isFinished();
        };

        /**
         * Reset status.
         */
        that.reset = function() {
            currentAction.reset();
        };

        /**
         * Set action.
         */
        that.setAction = function(action) {
            currentAction = action;
        };

        /**
         * Set speed.
         * @public
         * @param {Number} speed Speed to set.
         */
        that.setSpeed = function(speed) {
            currentSpeed = speed;
        };

        /**
         * Return speed.
         * @public
         * @return {Number} Current speed of this task.
         */
        that.getSpeed = function() {
            return currentSpeed;
        };

        /**
         * Set direction
         * @public
         * @param {Number} direction Direction to set. 
         */
        that.setDirection = function(direction) {
            while (direction > PI2) {
                direction -= PI2;
            }
            while (direction < -PI2) {
                direction += PI2;
            }
            currentDirection = direction;
        };

        /**
         * Return direction.
         * @public
         * @return {Number} Current direction of this task.
         */
        that.getDirection = function() {
            return currentDirection;
        };

        //debug('Create ' + that.type() + ':' + that.id());
        
        return that;
    };

    return enemyTask;
});