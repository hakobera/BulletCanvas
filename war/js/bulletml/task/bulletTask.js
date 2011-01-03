/**
 * bulletTask.js - Task for bullet.
 */
define(['bulletml/task/enemyTask', 'bulletml/task/taskType', 'lib/debug'],
function(enemyTask, TaskType, debug) {
    var bulletTask = function(spec) {
        var that = enemyTask(spec);

// init
        var updateContext = spec.updateContext;

        /**
         * previous frame X coordinate.
         * @private
         */
        var prevX = that.getX();

        /**
         * previous frame Y coordinate.
         * @private
         */
        var prevY = that.getY();

        /**
         * Current speed.
         */
        var currentSpeed = 1;

        /**
         * Current direction.
         */
        var currentDirection = 0;

        /**
         * Return type of this task.
         * @return {String} 'player'
         */
        that.type = function() {
            return TaskType.BULLET;
        };

        var superUpdate = that.update;
       /**
         * Update task properties, status, etc.
         * @public
         * @param updateContext {Object} Context for update object.
         */
        that.update = function(updateContext) {
            superUpdate(updateContext);
            
            prevX = that.getX();
            prevY = that.getY();
            var nx = prevX + Math.sin(currentDirection) * currentSpeed;
            var ny = prevY + Math.cos(currentDirection) * currentSpeed;
            that.setX(nx);
            that.setY(ny);
        };

        /**
         * Draw an object related this task.
         * @public
         * @param drawContext Context for drawing object.
         */
        that.draw = function(drawContext) {
            //drawContext.drawLine(that.getX(), that.getY(), prevX, prevY, 2, '#0xaaffaa');
            drawContext.drawCircle(that.getX(), that.getY(), 2, '#aaffaa');
        };

        /**
         * Set speed.
         * @public
         */
        that.setSpeed = function(speed) {
            currentSpeed = speed;
        }

        /**
         * Set direction
         * @public
         */
        that.setDirection = function(direction) {
            currentDirection = direction;
        }

        debug('Create ' + that.type() + ':' + that.id());
        
        return that;
    };

    return bulletTask;
});