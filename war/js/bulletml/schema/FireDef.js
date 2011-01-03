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
         */
        that.commandType = function() {
            return CommandType.FIRE;
        };

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