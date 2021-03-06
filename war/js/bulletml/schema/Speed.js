/**
 * Specifies a speed.
 * 速度を指定します。
 * typeが"relative"の場合、 changeSpeed要素内では現在の弾の速度との相対値、 それ以外の要素内ではこの弾の速度との相対値です。
 * typeが"sequence"の場合、 changeSpeed要素内では弾の速度を連続的に変化させ、 それ以外の要素内では直前の弾の速度との相対値です。
 */
define(['util/format'], function(format) {
	var speed = function(spec) {
        var that = {};
        that.type = spec.type ? spec.type : 'absolute';
        that.value = spec.value ? spec.value : 1.0;

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            other.type = that.type;
            other.value = that.value;
            return other;
        };

        that.toString = function() {
            return format('<Speed type=%1, value=%2>', that.type, that.value);
        };

        return that;
	};

    return speed;
});