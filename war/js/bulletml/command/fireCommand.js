define(['bulletml/command/command', 'lib/debug'], function(command, debug) {
    /**
     * @constructor
     * @param fireDef {Object} Fire command definition.
     */
    var fireCommand = function(fireDef) {
        var that = command();

        var calcDirection = function(task, direction, actionCommand, updateContext) {
            var d = updateContext.evalExpression(direction.value, [90]);
            var angle = d * Math.PI / 180;
            
            switch (direction.type) {
            case 'aim':
                angle += updateContext.getAimAngle(task.getX(), task.getY());
                break;

            case 'absolute':
                angle = -angle - Math.PI; // Because up direction is zero.
                break;

            case 'sequence':
                angle += actionCommand.getPrevFireDirection();
                break;

            case 'relative':
                angle = -angle  - Math.PI/2 + actionCommand.getCurrentDirection();
                break;
            }
            actionCommand.setPrevFireDirection(angle);
            return angle;
        };

        /**
         * Execute command.
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, actionCommand, updateContext) {
            var parameters = [];
            fireDef = updateContext.findFireDef(fireDef);
            //var fireParameters = 



            var bulletDef = updateContext.findBulletDef(fireDef.bullet);
            bulletDef.speed = bulletDef.speed || fireDef.speed;
            bulletDef.direction = bulletDef.direction || fireDef.direction;
            var bullet = updateContext.addBullet(bulletDef, {
                parent: task,
                x: task.getX(),
                y: task.getY()
            });

            var direction = calcDirection(task, bulletDef.direction, actionCommand, updateContext);
            bullet.setDirection(direction);

            var speed = updateContext.evalExpression(bulletDef.speed.value);
            bullet.setSpeed(speed);

            return true;
        };

        return that;
    };

    return fireCommand;
});