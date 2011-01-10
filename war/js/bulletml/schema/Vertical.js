/**
 * Specifies the acceleration in a vertical line.
 * 垂直方向の弾の加速度を指定します。
 * typeが"sequence"の場合、現在の弾の速度との相対値です。
 * typeが"sequence"の場合、加速度を連続的に変化させます。
 */
define(['util/format'], function(format) {
	var vertical = function(spec) {
        var that = {};
        that.type = spec.type;
		that.value = spec.value;

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
            return format('<Vertical type=%1, value=%2>', that.type, that.value);
        };
        
        return that;
	};

    return vertical;
});