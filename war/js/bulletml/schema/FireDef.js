/**
 * Fires a bullet.
 * 弾を<direction>度方向に速度<speed>で撃ちます。 ラベル付けされたfire要素は、fireRef要素によって参照されます。
 */
define(['bulletml/command/commandType', 'util/format'], function(CommandType, format) {
	var fireDef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.direction = spec.direction;
        that.speed = spec.speed;
        that.bullet = spec.bullet;

        /**
         * Return tag type.
         * @public
         * @return {String} CommandType.FIRE
         */
        that.commandType = function() {
            return CommandType.FIRE;
        };

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            other.label = that.label;
            other.direction = that.direction ? that.direction.clone() : undefined;
            other.speed = that.speed ? that.speed.clone() : undefined;
            other.bullet = that.bullet.clone();
            return other;
        };

        /**
         * @return {String} String representation of this object.
         */
        that.toString = function() {
            return format(
                    '<FireDef label=%1, direction=%2, speed=%3, bullet=%4>',
                    that.label,
                    that.direction,
                    that.speed,
                    that.bullet);
        };

        return that;
	};

    return fireDef;
});