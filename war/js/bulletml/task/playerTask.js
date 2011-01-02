/**
 * playerTask.js - Task for player.
 */
define(['bulletml/task/displayObjectTask', 'lib/debug'], function(displayObjectTask, debug) {
    var playerTask = function(spec) {
        var that = displayObjectTask(spec);

        /**
         * Return type of this task.
         * @return {String} 'player'
         */
        that.type = function() {
            return 'player';
        };

       /**
         * Update task properties, status, etc.
         * Default implementation do nothing.
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
         * Default implimentation do nothing.
         * @public
         * @param drawContext Context for drawing object.
         */
        that.draw = function(drawContext) {
            drawContext.drawCircle(that.getX(), that.getY(), 5, '#fff');
        };

        debug('Create ' + that.type() + ':' + that.id());

        return that;
    };

    return playerTask;
});