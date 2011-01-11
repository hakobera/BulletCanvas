define(['bulletml/command/command', 'lib/debug'], function(command, debug) {
    /**
     * @constructor
     * @param fireDef {Object} Fire command definition.
     */
    var fireCommand = function(fireDef, spec) {
        var that = command(spec);

        var calcDirection = function(task, direction, actionCommand, params, updateContext) {
            var d = updateContext.evalExpression(direction.value, params);
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
            var parameters = that.getParameters().length === 0 ? actionCommand.getParameters() : that.getParameters();
            var fireDefImpl = updateContext.findFireDef(fireDef, parameters);

            var bulletDef = updateContext.findBulletDef(fireDefImpl.bullet, fireDefImpl.params);
            bulletDef.speed = bulletDef.speed || fireDef.speed;
            bulletDef.direction = bulletDef.direction || fireDefImpl.direction;
            var bullet = updateContext.addBullet(bulletDef, {
                parent: task,
                x: task.getX(),
                y: task.getY(),
                parameters: bulletDef.params
            });

            var direction = calcDirection(task, bulletDef.direction, actionCommand, bulletDef.params, updateContext);
            bullet.setDirection(direction);

            var speed = updateContext.evalExpression(bulletDef.speed.value, bulletDef.params);
            bullet.setSpeed(speed);

            return true;
        };

        return that;
    };

    return fireCommand;
});