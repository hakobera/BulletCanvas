/**
 * Specifies the acceleration in a horizontal line.
 * 水平方向の弾の加速度を指定します。
 * typeが"relative"の場合、現在の弾の速度との相対値です。 typeが"sequence"の場合、加速度を連続的に変化させます。
 */
define([
	'util/messageFormat'
],
function(fmt) {
	var Horizontal = function(type, value) {
		this.type = type;
		this.value = value;
	};
	
	var pt = Horizontal.prototype;
	pt.toString = function() {
		return fmt.format('[Horizontal] type=%1, value=%2', this.type, this.value);
	};
	
	return {
		create: function(node) {
			var type = node.attributes['label'].value;
			var value = parseFloat(node.textContent);
			return new Horizontal(type, value);
		}
	};	
});