/**
 * Specifies the parameter. * 
 * パラメタを指定します。
 */
define([
	'util/messageFormat'
],
function(fmt) {
	var Param = function(value) {
		this.value = value;
	};
	
	var pt = Param.prototype;
	pt.toString = function() {
		return fmt.format('[Param] value=%1', this.value);
	};
	
	return {
		create: function(node) {
			var value = parseFloat(node.textContent);
			return new Param(value);
		}
	};	
});