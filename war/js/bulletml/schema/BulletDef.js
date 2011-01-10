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

        that.bulletType = function() {
            return 'bulletDef';
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
            other.actions = [];
            if (that.actions) {
                for (var i = 0; i < that.actions.length; ++i) {
                    other.actions[i] = that.actions[i].clone();
                }
            }
            return other;
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