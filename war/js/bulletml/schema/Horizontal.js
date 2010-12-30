/**
 * Specifies the acceleration in a horizontal line.
 * 水平方向の弾の加速度を指定します。
 * typeが"relative"の場合、現在の弾の速度との相対値です。 typeが"sequence"の場合、加速度を連続的に変化させます。
 */
define(['util/format'], function(format) {
	var horizontal = function(spec) {
        var that = {};
        that.type = spec.type;
        that.value = spec.value;

        that.toString = function() {
            return format('<Horizontal type=%1, value=%2>', that.type, that.value);
        };

        return that;
    };

    return horizontal;
});