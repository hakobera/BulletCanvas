/**
 * Vanishes a bullet.
 * 弾を消します。
 */
define(['util/format'], function(format) {
	var vanish = function(spec) {
        var that = {};

        that.toString = function() {
            return format('<Vanish>');
        };

        return that;
	};

    return vanish;
});