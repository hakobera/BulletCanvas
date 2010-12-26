/**
 * Specifies a speed.
 * 速度を指定します。
 * typeが"relative"の場合、 changeSpeed要素内では現在の弾の速度との相対値、 それ以外の要素内ではこの弾の速度との相対値です。
 * typeが"sequence"の場合、 changeSpeed要素内では弾の速度を連続的に変化させ、 それ以外の要素内では直前の弾の速度との相対値です。
 */
define([
	'util/messageFormat'
],
function(fmt) {
	var Speed = function(type, value) {
		this.type = type ? type.value : 'absolute';
		this.value = value;
	};
	
	var pt = Speed.prototype;
	pt.toString = function() {
		fmt.format('[Speed] type=%1, value=%2', this.type, this.value);
	};
	
	return {
		create: function(node) {
			var type = node.attributes.type;
			var value = parseFloat(node.textContent);
			return new Speed(type, value);
		},
		
		defaultValue: function() {
			return new Speed(null, 1);
		}
	}
});