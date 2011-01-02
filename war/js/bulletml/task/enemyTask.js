/**
 * playerTask.js - Task for player.
 */
define(['bulletml/task/displayObjectTask', 'lib/debug'], function(displayObjectTask, debug) {
    var enemyTask = function(spec) {
        var that = displayObjectTask(spec);

        /**
         * Return commandType of this task.
         * @return {String} 'player'
         */
        that.commandType = function() {
            return 'enemy';
        };

        /**
         * Update task properties, status, etc.
         * Default implimentation do nothing.
         *
         * @public
         */
        that.update = function() {
        };

        /**
         * Draw an object related this task.
         * Default implimentation do nothing.
         * @public
         * @param drawContext Context for drawing object.
         */
        that.draw = function(drawContext) {
            drawContext.drawCircle(that.getX(), that.getY(), 10, '#f00');
        };

        debug('Create ' + that.type() + ':' + that.id());
        
        return that;
    };

    return enemyTask;
});