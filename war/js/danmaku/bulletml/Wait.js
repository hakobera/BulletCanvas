/**
 * Waits.
 * Specifies the number of times.
 */
define([
	'util/messageFormat'
],
function(fmt) {
	var Wait = function(value) {
		this.value = value;
	};
	
	var pt = Wait.prototype;
	pt.toString = function() {
		return fmt.format('[Wait] value=%1', this.value);
	};
	
	return {
		create: function(node) {
			var value = parseFloat(node.textContent);
			return new Wait(value);
		}
	};	
});