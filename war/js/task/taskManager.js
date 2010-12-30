/**
 * taskSystem - Module for managing tasks.
 */
define(
[
    'lib/debug'
],
function(debug) {
    /**
     * Task list managed by this taskSystem.
     * @private
     * @type hash[String, Array]
     */
    var managedTasks = {};

    /**
     * Draw context for this taskSystem.
     *
     * @private
     * @type {Object}
     */
    var drawContext;

    return {
        /**
         * Create and add task to taskSystem.
         *
         * @public
         * @param type {String} Type name of a task
         * @param spec {Object} Spec of a task
         * @return {Object] (this) taskManager.
         */
        addTask: function(task) {
            var taskType = task.type();
            var tasks = managedTasks[taskType];
            if (!tasks) {
                tasks = [];
                managedTasks[taskType] = tasks;
            }
            tasks.push(task);
            return this;
        },

        /**
         * Update all managed tasks.
         *
         * @public
         */
        update: function() {
            var k, list, i, size;
            for (k in managedTasks) {
                list = managedTasks[k];
                size = list.length;
                for (i = 0; i < size; ++i) {
                    list[i].update();
                }
            }
        },

        /**
         * Update all managed tasks.
         *
         * @public
         */
        draw: function() {
            var k, list, i, size;
            for (k in managedTasks) {
                list = managedTasks[k];
                size = list.length;
                for (i = 0; i < size; ++i) {
                    list[i].draw(drawContext);
                }
            }
        },

        /**
         * Set drawContext.
         *
         * @public
         * @param {Object} drawContext
         */
        setDrawContext: function(context) {
            drawContext = context;
        }
    };
});