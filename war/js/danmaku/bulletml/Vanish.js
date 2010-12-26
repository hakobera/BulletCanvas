/**
 * Vanishes a bullet.
 * 弾を消します。
 */
define([
	'util/messageFormat'
],
function(fmt) {
	var Vanish = function() {
	};
	
	var pt = Vanish.prototype;
	pt.toString = function() {
		return fmt.format('[Vanish]');
	};
	
	return {
		create: function(node) {
			return new Vanish();
		}
	};	
});