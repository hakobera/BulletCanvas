/**
 * task.js - Module for task managed by taskSystem.
 */
define(['lib/uuid', 'lib/debug'], function(uuid, debug) {
    /**
     * Constructor for task.
     *
     * @param spec specified the properties for creation task
     * @constructor
     */
    var task = function(spec) {
        var that = {};
        var taskId = uuid.generate();
        var taskManager;
        var active = true;
        var parent = (spec && spec.parent) ? spec.parent : null;

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
         * Return taskManager managed by this system.
         * @public
         * @return {Object} taskManager
         */
        that.getTaskManager = function() {
            return taskManager; 
        };

        /**
         * Set taskManager managed by this system.
         * @public
         * @param manager {Object} taskManager
         */
        that.setTaskManager = function(manager) {
            return taskManager = manager;
        };

        /**
         * Return parent task.
         * If task has not parent, return null.
         * @public
         * @return {Object} parent task.
         */
        that.getParent = function() {
            return parent; 
        };

        /**
         * Return task is active or not.
         * @public
         * @return {boolean} true if task if active.
         */
        that.isActive = function() {
            if (parent) {
                return parent.isActive() && active;
            } else {
                return active;
            }
        };

        /**
         * Kill this task.
         * @public
         */
        that.kill = function() {
            active = false;
            debug('Killed ' + this.type() + ':' + this.id());
        };

        /**
         * Update task properties, status, etc.
         * Default implementation do nothing.
         * @public
         * @param updateContext {Object} Context for update object.
         */
        that.update = function(updateContext) {};

        /**
         * Draw an object related this task.
         * Default implimentation do nothing.
         * @public
         * @param drawContext {Object} Context for drawing object.
         */
        that.draw = function(drawContext) {};

        return that;
    };

    return task;
});