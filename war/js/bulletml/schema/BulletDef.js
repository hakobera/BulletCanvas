/**
 * Defines attributes of a bullet
 * 弾の方向、速度およびアクションを定義します。
 * ラベル属性でラベル名をつけることができます。
 * ラベル付けされたbullet要素は、bulletRef要素によって参照されます。
 */
define(['util/format'], function(format) {
    var bulletDef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.direction = spec.direction;
        that.speed = spec.speed;
        that.actions = spec.actions;

        /**
         * Return tag type.
         * @public
         */
        that.type = function() {
            return 'bulletDef';
        };

        that.toString = function() {
            return format(
                    '<BulletDef label=%1, direction=%2, speed=%3, actions=%4>',
                    that.label,
                    that.direction,
                    that.speed,
                    that.actions);
        };

        return that;
	};

    return bulletDef;
});