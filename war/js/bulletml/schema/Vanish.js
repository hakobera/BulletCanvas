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

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            return other;
        };

        that.toString = function() {
            return format('<Vanish>');
        };

        return that;
	};

    return vanish;
});