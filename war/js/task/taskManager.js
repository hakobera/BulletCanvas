/**
 * taskSystem - Module for managing tasks.
 */
define(
[
    'lib/debug'
],
function(debug) {
    /**
     * @constructor
     */
    var taskManager = function() {
        var that = {};
        
        /**
         * Task list managed by this taskSystem.
         * @private
         * @type hash[String, Array]
         */
        var managedTasks = {};

        /**
         * Create and add task to taskSystem.
         *
         * @public
         * @param type {String} Type name of a task
         * @param spec {Object} Spec of a task
         * @return {Object] (this) taskManager.
         */
        that.addTask = function(task) {
            var taskType = task.type();
            var tasks = managedTasks[taskType];
            if (!tasks) {
                tasks = [];
                managedTasks[taskType] = tasks;
            }
            tasks.push(task);
            task.setTaskManager(that);
            return that;
        };

        /**
         * Update all managed tasks.
         *
         * @public
         * @param updateContext {Object} Context for update object.
         */
        that.update = function(updateContext) {
            var k, list, i, size;
            for (k in managedTasks) {
                list = managedTasks[k];
                var newList = []
                size = list.length;
                for (i = 0; i < size; ++i) {
                    if (list[i].isActive()) {
                        newList.push(list[i]);
                    } else {
                        list[i] = null;
                    }
                }

                size = newList.length;
                for (i = 0; i < size; ++i) {
                    newList[i].update(updateContext);
                }
                managedTasks[k] = newList;
            }
        };

        /**
         * Update all managed tasks.
         *
         * @public
         */
        that.draw = function(drawContext) {
            var k, list, i, size;
            for (k in managedTasks) {
                list = managedTasks[k];
                size = list.length;
                for (i = 0; i < size; ++i) {
                    list[i].draw(drawContext);
                }
            }
        };

        return that;
    };

    return taskManager;
});