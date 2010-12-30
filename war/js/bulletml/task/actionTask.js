/**
 * task.js - Module for task managed by taskSystem.
 */
define(['task/task', 'lib/debug'], function(task, debug) {
    var actionTask = function(spec) {
        var that = task(spec);

        /**
         * Return type of this task.
         * @return {String} 'action'
         */
        that.type = function() {
            return 'action';
        };

        /**
         * Update task properties, status, etc.
         * Default implimentation do nothing.
         *
         * @public
         */
        that.update = function() {
            debug('[update]' + this);
        };

        /**
         * Draw an object related this task.
         * Default implimentation do nothing.
         * @public
         * @param drawContext Context for drawing object.
         */
        that.draw = function(drawContext) {
            debug('[draw]' + this);
        };

        return that;
    };

    return actionTask;
});