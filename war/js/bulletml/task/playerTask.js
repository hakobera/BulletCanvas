/**
 * playerTask.js - Task for player.
 */
define(['bulletml/task/displayObjectTask', 'bulletml/task/taskType', 'lib/debug'],
function(displayObjectTask, TaskType, debug) {
    var playerTask = function(spec) {
        var that = displayObjectTask(spec);
        var minX = spec.minX;
        var minY = spec.minY;
        var maxX = spec.maxX;
        var maxY = spec.maxY;

        /**
         * Return type of this task.
         * @return {String} 'player'
         */
        that.type = function() {
            return TaskType.PLAYER;
        };

       /**
         * Update task properties, status, etc.
         * @public
         * @param updateContext {Object} Context for update object.
         */
        that.update = function(updateContext) {
            var input = updateContext.getInput();
            var SCALE = 3;
            var nx = this.getX() + input.x * SCALE | 0;
            var ny = this.getY() - input.y * SCALE | 0;
            this.setX(nx);
            this.setY(ny);
        };

        /**
         * Draw an object related this task.
         * @public
         * @param drawContext Context for drawing object.
         */
        that.draw = function(drawContext) {
            drawContext.drawCircle(that.getX(), that.getY(), 5, '#fff');
        };

        var superSetX = that.setX;
        /**
         * @public
         */
        that.setX = function(v) {
            superSetX(Math.min(maxX, Math.max(minX, v)));
        };

        var superSetY = that.setY;
        /**
         * @public
         */
        that.setY = function(v) {
            superSetY(Math.min(maxY, Math.max(minY, v)));
        };

        debug('Create ' + that.type() + ':' + that.id());

        return that;
    };

    return playerTask;
});