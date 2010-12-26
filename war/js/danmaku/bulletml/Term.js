/**
 * Specifies a term.
 * 期間を指定します。
 */
define([
	'util/messageFormat'
],
function(fmt) {
	var Term = function(value) {
		this.value = value;
	};
	
	var pt = Term.prototype;
	pt.toString = function() {
		return fmt.format('[Term] value=%1', this.value);
	};
	
	return {
		create: function(node) {
			var value = parseFloat(node.textContent);
			return new Term(value);
		}
	};	
});