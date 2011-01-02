/**
 * bulletTask.js - Task for bullet.
 */
define(
[
    'bulletml/task/displayObjectTask',
    'bulletml/expression',
    'lib/debug'
],
function(displayObjectTask, expression, debug) {
    var bulletTask = function(spec) {
        var that = displayObjectTask(spec);

        var bulletDef = spec.bullet;
        var speed = bulletDef.speed;
        var direction = bulletDef.direction;
        var updateContext = spec.updateContext;

        /**
         * previous frame X coordinate.
         * @private
         */
        var prevX = that.getX();

        /**
         * previous frame Y coordinate.
         * @private
         */
        var prevY = that.getY();

        /**
         * Calculate speed
         * @private
         */
        var calcSpeed = function(speed) {
            var s = updateContext.evalExpression(speed.value);
            return s;
        }

        /**
         * Calculate direction
         * @private
         */
        var calcDirection = function(direction) {
            var d = updateContext.evalExpression(direction.value) * Math.PI / 180;
            var angle = 0;
            switch (direction.type) {
                case 'aim':
                    angle = d + taskSystem.getAimAngle(that.getX(), that.getY());
                    break;
                    
                case 'absolute':
                    angle = d;
                    break;

                case 'relative':
                    angle = currentDirection + d;
                    break;

                case 'sequence':
                    // TODO: 最後に fire した方向を覚えておく必要あり
                    break;
            }
            return angle;           
        }

        var currentSpeed = calcSpeed(speed);
        var currentDirection = calcDirection(direction);

        /**
         * Return type of this task.
         * @return {String} 'player'
         */
        that.type = function() {
            return 'bullet';
        };

       /**
         * Update task properties, status, etc.
         * Default implementation do nothing.
         * @public
         * @param updateContext {Object} Context for update object.
         */
        that.update = function(updateContext) {
            prevX = that.getX();
            prevY = that.getY();
            var nx = prevX + Math.sin(currentDirection) * currentSpeed;
            var ny = prevY + Math.cos(currentDirection) * currentSpeed;
            that.setX(nx);
            that.setY(ny);
        };

        /**
         * Draw an object related this task.
         * Default implimentation do nothing.
         * @public
         * @param drawContext Context for drawing object.
         */
        that.draw = function(drawContext) {
            //drawContext.drawLine(that.getX(), that.getY(), prevX, prevY, 2, '#0xaaffaa');
            drawContext.drawCircle(that.getX(), that.getY(), 2, '#aaffaa');
        };

        debug('Create ' + that.type() + ':' + that.id());
        
        return that;
    };

    return bulletTask;
});