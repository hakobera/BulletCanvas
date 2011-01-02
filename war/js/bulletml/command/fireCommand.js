define(['bulletml/command/command', 'lib/debug'], function(command, debug) {
    /**
     * @constructor
     * @param fireDef {Object} Fire command definition.
     */
    var fireCommand = function(fireDef) {
        var that = command();
        var direction = fireDef.direction;
        var speed = fireDef.speed;

        var calcDirection = function() {
            switch (direction.type) {
            case 'aim':
                break;

            case 'absolute':
                break;

            case 'sequence':
                break;
            }
        };

        /**
         * Execute command.
         * @param {Object} task Call action task
         * @param {Object} updateContext
         * @return true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, updateContext) {
            var bulletDef = fireDef.bullet;
            var bullet = updateContext.addBullet(bulletDef);
            return true;
        };

        return that;
    };

    return fireCommand;
});