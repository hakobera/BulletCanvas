/**
 * Specifies the number of times.
 * 繰り返し回数を指定します。
 */
define([
	'util/messageFormat'
],
function(fmt) {
	var Times = function(value) {
		this.value = value;
	};
	
	var pt = Times.prototype;
	pt.toString = function() {
		return fmt.format('[Times] value=%1', this.value);
	};
	
	return {
		create: function(node) {
			var value = parseFloat(node.textContent);
			return new Times(value);
		}
	};	
});