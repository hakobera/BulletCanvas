/**
 * Vanishes a bullet.
 * 弾を消します。
 */
define(['util/messageFormat'], function(fmt) {
	var vanish = function(spec) {
        var that = {};

        that.toString = function() {
            return fmt.format('[Vanish]');
        };

        return that;
	};

    return vanish;
});