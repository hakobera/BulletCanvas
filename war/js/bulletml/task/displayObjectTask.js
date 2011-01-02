/**
 * displayObjectTask.js - Task for displayable object.
 */
define(['task/task', 'lib/debug'], function(task, debug) {
    var displayObjectTask = function(spec) {
        var that = task(spec);

        /**
         * X coordinate
         * @private
         */
        var x = spec.x ? spec.x : 0;

        /**
         * Y coordinate
         * @private
         */
        var y = spec.y ? spec.y : 0;

        /**
         * Return x coordinate.
         * @return {integer} X coordinate
         */
        that.getX = function() {
            return x;
        };

        /**
         * Set x coordinate.
         * @param x {integer} X coordinate
         */
        that.setX = function(v) {
            x = v;
        };

        /**
         * Return y coordinate.
         * @return {integer} Y coordinate
         */
        that.getY = function() {
            return y;
        };

        /**
         * Set y coordinate.
         * @param v {integer} Y coordinate
         */
        that.setY = function(v) {
            y = v;
        };

        return that;
    };

    return displayObjectTask;
});