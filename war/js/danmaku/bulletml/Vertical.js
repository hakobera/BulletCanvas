/**
 * Specifies the acceleration in a vertical line.
 * 垂直方向の弾の加速度を指定します。
 * typeが"sequence"の場合、現在の弾の速度との相対値です。
 * typeが"sequence"の場合、加速度を連続的に変化させます。
 */
define([
	'util/messageFormat'
],
function(fmt) {
	var Vertical = function(type, value) {
		this.type = type;
		this.value = value;
	};
	
	var pt = Vertical.prototype;
	pt.toString = function() {
		return fmt.format('[Vertical] type=%1, value=%2', this.type, this.value);
	};
	
	return {
		create: function(node) {
			var type = node.attributes['label'].value;
			var value = parseFloat(node.textContent);
			return new Vertical(type, value);
		}
	};	
});