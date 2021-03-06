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
         * @param updateContext {Object} Context for updating task.
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
         * @param drawContext {Object} Context for drawing task.
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

        /**
         * Kill all managed tasks.
         *
         * @public
         */
        that.kill = function() {
            var k, list, i, size;
            for (k in managedTasks) {
                list = managedTasks[k];
                size = list.length;
                for (i = 0; i < size; ++i) {
                    list[i] = null;
                }
                delete managedTasks[k];
            }
        };

        /**
         * Return specified typed task list.
         * @public
         * @param taskType {String} Type name of a task
         * @return {Array} specified typed task list
         */
        that.getTasks = function(taskType) {
            return managedTasks[taskType];
        };

        return that;
    };

    return taskManager;
});