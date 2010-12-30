/**
 * Fires a bullet.
 * 弾を<direction>度方向に速度<speed>で撃ちます。 ラベル付けされたfire要素は、fireRef要素によって参照されます。
 */
define(['util/messageFormat'], function(fmt) {
	var fireDef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.direction = spec.direction;
        that.speed = spec.speed;

        that.toString = function() {
            return fmt.format(
                    '[FireDef] label=%1, direction=%2, speed=%3',
                    that.label,
                    that.direction,
                    that.speed);
        };

        return that;
	};

    return fireDef;
});