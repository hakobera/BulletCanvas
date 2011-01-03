/**
 * Vanishes a bullet.
 * 弾を消します。
 */
define(['bulletml/command/commandType', 'util/format'], function(CommandType, format) {
	var vanish = function(spec) {
        var that = {};

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return CommandType.VANISH;
        };

        that.toString = function() {
            return format('<Vanish>');
        };

        return that;
	};

    return vanish;
});