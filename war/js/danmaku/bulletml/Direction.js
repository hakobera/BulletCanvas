/**
 * Specifies a direction.
 * 方向を度単位で指定します。
 * typeが"aim"の場合、自機を狙う方向が0の相対値になります。
 * typeが"absolute"の場合、NUMBERは絶対値（上方向が0で時計回り）です。
 * typeが"relative"の場合、NUMBERはこの弾の方向が0の相対値になります。
 * typeが"sequence"の場合、直前の弾を撃った方向が0の相対値になります。
 */
define([
  'util/messageFormat'
],
function(fmt) {
	var Direction = function(type, value) {
		this.type = type ? type.value : 'aim';
		this.value = value;
	};
	
	var pt = Direction.prototype;
	pt.toString = function() {
		return fmt.format('[Direction] type=%1, value=%2', this.type, this.value);
	};
	
	return {
		create: function(node) {
			var type = node.attributes['type'];
			var value = node.textContent;
			return new Direction(type, value);
		},
		
		defaultValue: function() {
			return new Direction(null, 0);
		}
	}
});