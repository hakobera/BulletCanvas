/**
 * taskSystem.js - Task system for BulletML based document.
 */
define(
[
    'task/taskManager',
    'bulletml/parser',
    'bulletml/expression',
    'bulletml/task/taskFactory',
    'graphics/drawContext',
    'util/fpsTimer'
],
function(TaskManager, Parser, Expression, TaskFactory, DrawContext, FpsTimer) {
    var SCREEN_WIDTH = 320;
    var SCREEN_HEIGHT = 320;

    /**
     * @constructor
     * @param bulletML {XMLDocument} BulletML document.
     */
    var taskSystem = function(bulletML, elementId) {
        var that = {};

        /**
         * Task manager.
         * @private
         */
        var taskManager;

        var player;

        /**
         * Expression evaluator.
         * @private
         */
        var expression;

        /**
         * Context for drawing.
         * @private
         */
        var drawContext;

        /**
         * FPS timer.
         * @private
         */
        var fpsTimer;

        /**
         * Event queue.
         * @private
         */
        var eventQueue = [];

        /**
         * Status of this system.
         * @private
         */
        var status = 'stop';

        /**
         * Controller.
         * @private
         */
        var controller = {
            input: function() { return { x:0, y:0 } },
            getX: function() { return 0; },
            getY: function() { return 0; }
        };

        /**
         * Add action.
         * @private
         * @param actionDef {Object} Action definition
         * @param repeatTime {integer} Repeat count
         */
        var addAction = function(actionDef, repeatTimes) {
            var action = TaskFactory.createTask('action', {
                                                    updateContext: updateContext,
                                                    actionDef: actionDef,
                                                    repeatTimes: repeatTimes
                                                });
            addEvent(function() {
                taskManager.addTask(action);
            });
        };

        /**
         * Create TaskManager instance.
         * @private
         * @param actionDef {Object} Action definition
         * @param repeatTime {integer} Repeat count
         */
        var createTaskManager = function(bulletML) {
            var taskManager = TaskManager();
            var parser = Parser();
            var bulletMLDocument = parser.parse(bulletML);
            var actionDefinitions = bulletMLDocument.getActions();
            var size = actionDefinitions.length;
            for (var i = 0; i < size; ++i) {
                addAction(actionDefinitions[i], 1);
            }
            return taskManager;
        };

        /**
         * Add event to event queue.
         * @private
         */
        var addEvent = function(func) {
            eventQueue.push(func);
        };

        /**
         * Process event.
         * @private
         */
        var processEvents = function() {
            var i, size;
            size = eventQueue.length;
            for (var i = 0; i < size; ++i) {
                eventQueue[i].apply(that);
            }
            eventQueue = [];
        };

        var updateContext = {
            /**
             * Return controller.
             * @public
             * @return controller
             */
            getInput: function() {
                return controller.input();
            },

            /**
             * Get aim degree to player task.
             * @public
             * @param {integer} x
             * @param {integer} y
             * @return {float} Degree to player task.
             */
            getAimAngle: function(x, y) {
                var dx = player.getX() - x;
                var dy = player.getY() - y;
                return Math.atan2(dx, dy);
            },

            /**
             * Add action.
             * @param actionDef {Object} Action definition
             * @param repeatTime {integer} Repeat count
             */
            addAction: addAction,

            /**
             * Add bullet.
             * @param bulletDef {Object} Bullet definition
             */
            addBullet: function(bulletDef) {
                var bullet = TaskFactory.createTask('bullet', { bullet: bulletDef, updateContext: updateContext });
                addEvent(function() {
                    taskManager.addTask(bullet);
                });
            },

            /**
             * Kill specified task.
             * @param task task to kill
             */
            killTask: function(task) {
                addEvent(function() {
                    task.kill();
                });
            },

            /**
             * Evaluate expression.
             * @param expr {String} Expression string.
             * @return {flaoat} Calculated value.
             */
            evalExpression: function(expr, params) {
                return expression.eval(expr, params);
            }
        };

        /**
         * Main loop of this system.
         * @private
         */
        var mainLoop = function() {
            processEvents();

            taskManager.update(updateContext);

            if (fpsTimer.updateInTime()) {
                drawContext.clear();
                taskManager.draw(drawContext);
                drawContext.flip();
            }
         };

        /**
         * Initialize task system.
         * @public
         */
        that.init = function() {
            expression = Expression();
            eventQueue = [];
            status = 'stop';

            drawContext = DrawContext({
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                node: document.getElementById(elementId)
            });

            fpsTimer = FpsTimer({
                fps: 30,
                callback: mainLoop 
            });

            taskManager = createTaskManager(bulletML, that);
            player = TaskFactory.createTask('player', { x: SCREEN_WIDTH/2, y: SCREEN_HEIGHT - 50 });
            taskManager.addTask(player);
        };

        /**
         * Return FPS timer of this system.
         * @public
         * @return FPS timer instance.
         */
        that.getFpsTimer = function() {
            return fpsTimer;
        };

        /**
         * Return status of system.
         * @public
         * @return 'stop' | 'playing' | 'pause'
         */
        that.status = function() {
            return status;
        };

        /**
         * Reset this system.
         * @public
         */
        that.reset = function() {
            fpsTimer.reset();
            status = 'stop';
        };
        
        /**
         * Play this system.
         * @public
         */
        that.play = function() {
            fpsTimer.start();
            status = 'playing';
        };

        /**
         * Pause this system.
         * @public
         */
        that.pause = function() {
            fpsTimer.pause();
            status = 'pause';
        };

        /**
         * Start this system.
         * @public
         */
        that.start = function() {
            that.init();
            that.reset();
            that.play();
        };

        /**
         * Stop this system.
         * @public
         */
        that.stop = function() {
            that.pause();
            that.reset();
        };

        /**
         * Set controller.
         * @public
         * @param {Object} ctrl
         */
        that.setController = function(ctrl) {
            controller = ctrl;
        };

        return that;
    };

    return taskSystem;    
});