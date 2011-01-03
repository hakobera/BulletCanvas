/**
 * taskSystem.js - Task system for BulletML based document.
 */
define(
[
    'task/taskManager',
    'bulletml/parser',
    'bulletml/expression',
    'bulletml/task/taskFactory',
    'bulletml/task/taskType',
    'bulletml/command/commandFactory',
    'bulletml/command/commandType',
    'graphics/drawContext',
    'util/fpsTimer'
],
function(TaskManager, Parser, Expression, TaskFactory, TaskType, CommandFactory, CommandType, DrawContext, FpsTimer) {
    var SCREEN_WIDTH = 300;
    var SCREEN_HEIGHT = 300;
    var FPS = 60;

    /**
     * @constructor
     */
    var taskSystem = function() {
        var that = {};

        /**
         * Task manager.
         * @private
         */
        var taskManager;

        /**
         * BulletML parsed document object.
         * @private
         */
        var bulletMLDocument;

        /**
         * Player task.
         * @private
         */
        var player;

        /**
         * Enemy task.
         * @private
         */
        var enemy;

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
         * Update context contains utility method for task in update phase.
         * @private
         */
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
             * @param {Number} x
             * @param {Number} y
             * @return {Number} Degree to player task.
             */
            getAimAngle: function(x, y) {
                var dx = player.getX() - x;
                var dy = player.getY() - y;
                return Math.atan2(dx, dy);
            },

            /**
             * Create action command.
             * @public
             * @param {Object} actionDef Action definition
             * @param {Object} spec Optional arguments
             * @return Added action command.
             */
            createAction: function(actionDef, spec) {
                spec = spec || {};
                spec.updateContext = updateContext;
                actionDef = this.findActionDef(actionDef);
                var action = CommandFactory.createCommand(actionDef, spec);
                return action;
            },

            /**
             * Find actionDef.
             * If action is 'actionRef', create new actionDef and return it.
             * @param {Object} action actionDef or actionRef
             * @return {Object} actionDef instance
             */
            findActionDef: function(action) {
                if (action.commandType() === CommandType.ACTION) {
                    return action;
                } else {
                    var label = action.label;
                    var actionDef = bulletMLDocument.getAction(label);
                    return actionDef;
                }
            },

            /**
             * Add bullet.
             * @public
             * @param {Object} bulletDef Bullet definition
             * @param {Object} spec Optional arguments.
             * @return {Object} Added bullet task.
             */
            addBullet: function(bulletDef, spec) {
                spec = spec || {};
                spec.bulletDef = bulletDef;
                spec.updateContext = updateContext
                var bullet = TaskFactory.createTask(TaskType.BULLET, spec);
                addEvent(function() {
                    taskManager.addTask(bullet);
                });
                return bullet;
            },

            /**
             * Find bulletDef.
             * If bullet is 'bulletRef', create new bulletDef and return it.
             * @param {Object} bullet bulletDef or bulletRef
             * @return {Object} bulletDef instance
             */
            findBulletDef: function(bullet) {
                if (bullet.bulletType() === 'bulletDef') {
                    return bullet;
                } else {
                    var label = bullet.label;
                    var bulletDef = bulletMLDocument.getBullet(label);
                    return bulletDef;
                }
            },

            /**
             * Find fireDef.
             * If fire is 'fireRef', create new fireDef and return it.
             * @param {Object} fire fireDef or fireRef
             * @return {Object} fireDef instance
             */
            findFireDef: function(fire) {
                if (fire.commandType() === CommandType.FIRE) {
                    return fire;
                } else {
                    var label = fire.label;
                    var fireDef = bulletMLDocument.getFire(label);
                    console.log(fire.params);
                    fireDef.params = fire.params;
                    return fireDef;
                }
            },

            /**
             * Kill specified task.
             * @param {Object} task task to kill
             */
            killTask: function(task) {
                addEvent(function() {
                    task.kill();
                });
            },

            /**
             * Evaluate expression and return as number.
             * @param {String} expr Expression string to evaluate.
             * @param {Array} params Replacement parameters.
             * @return {Number} Evaluated value.
             */
            evalExpression: function(expr, params) {
                return expression.eval(expr, params);
            }
        };

        /**
         * Create TaskManager instance.
         * @private
         * @param {Object} bulletML XML Document
         */
        var initTaskManager = function(bulletML) {
            if (taskManager) {
                taskManager.kill();
            }
            
            taskManager = TaskManager();

            player = TaskFactory.createTask(TaskType.PLAYER, {
                x: SCREEN_WIDTH/2,
                y: SCREEN_HEIGHT - 50,
                minX: 0,
                minY: 0,
                maxX: SCREEN_WIDTH,
                maxY: SCREEN_HEIGHT
            });
            taskManager.addTask(player);

            var parser = Parser();
            bulletMLDocument = parser.parse(bulletML);

            enemy = TaskFactory.createTask(TaskType.ENEMY, { x: SCREEN_WIDTH/2, y: 50 });
            taskManager.addTask(enemy);

            var topActionDef = bulletMLDocument.getAction('top');
            var topAction = updateContext.createAction(topActionDef, { repeatTimes: 1 });
            enemy.setAction(topAction);
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
            for (i = 0; i < size; ++i) {
                eventQueue[i].apply(that);
            }
            eventQueue = [];
        };

        /**
         * Remove outscreen bullets.
         * @private
         */
        var removeOutScreenBullets = function() {
            var bulletTasks = taskManager.getTasks(TaskType.BULLET);
            if (bulletTasks) {
                var size = bulletTasks.length;
                for (var i = 0; i < size; ++i) {
                    var bulletTask = bulletTasks[i];
                    var x = bulletTask.getX();
                    var y = bulletTask.getY();
                    if (!drawContext.isInScreen(x, y)) {
                        bulletTask.kill();
                    }
                }
            }
        };       

        var idleCount = 0;
        /**
         * Main loop of this system.
         * @private
         */
        var mainLoop = function() {
            processEvents();
            removeOutScreenBullets();

            if (enemy.isIdle()) {
                if (++idleCount > 2*FPS) {
                    enemy.reset();
                    idleCount = 0;
                }
            }          

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
         * @param {Object} args Init parameters.
         */
        that.init = function(args) {
            expression = Expression(args.rank);
            eventQueue = [];
            status = 'stop';

            drawContext = DrawContext({
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                node: document.getElementById(args.targetId)
            });

            fpsTimer = FpsTimer({
                fps: FPS,
                callback: mainLoop 
            });

            initTaskManager(args.bulletML, that);
        };

        /**
         * Reset this system.
         * @public
         * @param {Object} args Init parameters.
         */
        that.reInit = function(args) {
            that.pause();

            eventQueue = [];
            status = 'stop';

            fpsTimer.reset();

            expression = Expression(args.rank);
            initTaskManager(args.bulletML, that);
        };

        /**
         * Return FPS timer of this system.
         * @public
         * @return {Number} FPS timer instance.
         */
        that.getFpsTimer = function() {
            return fpsTimer;
        };

        /**
         * Return bullet count.
         * @public
         * @return {int} Bullet count.
         */
        that.getBulletCount = function() {
            if (!taskManager) {
                return 0;
            }
            var bulletList = taskManager.getTasks(TaskType.BULLET);
            return bulletList ? bulletList.length : 0;
        };

        /**
         * Return status of system.
         * @public
         * @return {String} 'stop' | 'playing' | 'pause'
         */
        that.status = function() {
            return status;
        };
        
        /**
         * Play this system.
         * @public
         */
        that.play = function() {
            if (status !== 'playing') {
                fpsTimer.start();
                status = 'playing';
            }
        };

        /**
         * Pause this system.
         * @public
         */
        that.pause = function() {
            if (status !== 'pause') {
                fpsTimer.pause();
                status = 'pause';
            }
        };

        /**
         * Set controller.
         * @public
         * @param {Object} ctrl Controller instance.
         */
        that.setController = function(ctrl) {
            controller = ctrl;
        };

        return that;
    };

    return taskSystem;    
});