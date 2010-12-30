/**
 * Defines attributes of a bullet
 * 弾の方向、速度およびアクションを定義します。
 * ラベル属性でラベル名をつけることができます。
 * ラベル付けされたbullet要素は、bulletRef要素によって参照されます。
 */
define(['util/messageFormat'], function(fmt) {
    var bulletDef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.direction = spec.direction;
        that.speed = spec.speed;

        that.toString = function() {
            return fmt.format(
                    '[BulletDef] label=%1, direction=%2, speed=%3',
                    that.label,
                    that.direction,
                    that.speed);
        };

        return that;
	};

    return bulletDef;
});