/**
 * Specifies a direction.
 * 方向を度単位で指定します。
 * typeが"aim"の場合、自機を狙う方向が0の相対値になります。
 * typeが"absolute"の場合、NUMBERは絶対値（上方向が0で時計回り）です。
 * typeが"relative"の場合、NUMBERはこの弾の方向が0の相対値になります。
 * typeが"sequence"の場合、直前の弾を撃った方向が0の相対値になります。
 */
define(['util/format'], function(format) {
	var direction = function(spec) {
        var that = {};
        that.type = (spec && spec.type) ? spec.type : 'aim';
        that.value = (spec && spec.value) ? spec.value : 0;

        that.toString = function() {
            return format('<Direction type=%1, value=%2>', that.type, that.value);
        };

        return that;
	};

    return direction;
});