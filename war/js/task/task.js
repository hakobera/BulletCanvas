/**
 * task.js - Module for task managed by taskSystem.
 */
define(['lib/uuid'], function(uuid) {
    /**
     * Constructor for task.
     *
     * @param spec specified the properties for creation task
     * @constructor
     */
    var task = function(spec) {
        var that = {};
        var taskId = uuid.generate();

        /**
         * Return UUID of this task.
         * @return {String} UUID of this task.
         */
        that.id = function() {
            return taskId;
        };

        /**
         * Return type of this task.
         * This method must be override.
         * @return {String} type of this task.
         */
        that.type = function() {
            throw new Error('[type] Unsupported method in this task.')
        };

        /**
         * Update task properties, status, etc.
         * Default implimentation do nothing.
         *
         * @public
         */
        that.update = function() {};

        /**
         * Draw an object related this task.
         * Default implimentation do nothing.
         * @public
         * @param drawContext Context for drawing object.
         */
        that.draw = function(drawContext) {};

        return that;
    };

    return task;
});