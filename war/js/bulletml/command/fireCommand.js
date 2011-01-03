define(['bulletml/command/command', 'lib/debug'], function(command, debug) {
    /**
     * @constructor
     * @param fireDef {Object} Fire command definition.
     */
    var fireCommand = function(fireDef) {
        var that = command();

        var calcDirection = function(task, direction, updateContext) {
            var d = 0;
            switch (direction.type) {
            case 'aim':
                d = updateContext.getAimAngle();
                break;

            case 'absolute':
                break;

            case 'sequence':
                break;
            }
        };

        /**
         * Execute command.
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, actionCommand, updateContext) {
            var bulletDef = fireDef.bullet;
            //calcDirection(task, bulletDef.direction, updateContext);
            var bullet = updateContext.addBullet(bulletDef);
            
            return true;
        };

        return that;
    };

    return fireCommand;
});