/**
 * Accelerates a bullet	
 * 弾を水平方向に<horizontal>、垂直方向に<vertical>、 <term>フレームかけて加速します。
 */
define([
	'util/messageFormat',
	'danmaku/bulletml/Horizontal',
	'danmaku/bulletml/Vertical',
	'danmaku/bulletml/Term'
],
function(fmt, Horizontal, Vertical, Term) {
	var Accel = function(horizontal, vertical, term) {
		this.horizontal = horizontal;
		this.vertical = vertical;
		this.term = term;
	};
	
	var pt = Accel.prototype;
	pt.toString = function() {
		return fmt.format('[Accel] horizontal=%1, vertical=%2, term=%3', this.horizontal, this.vertical, this.termspeed, this.term);
	};
	
	return {
		create: function(node) {
			var horizontal;
			var horizontalNode = node.getElementsByTagName('horizontal');
			if (horizontalNode.length === 1) {
				horizontal = Horizontal.create(horizontalNode[0]);
			}

			var vertical;
			var verticalNode = node.getElementsByTagName('vertical');
			if (verticalNode.length === 1) {
				vertical = Horizontal.create(verticalNode[0]);
			}

			var term = null;
			var termNode = node.getElementsByTagName('term');
			if (termNode.length === 1) {
				term = Term.create(termNode[0]);
			} else {
				throw new Error('[accel] <term> is required.');
			}
			
			return new ChangeSpeed(horizontal, vertical, times, action);
		}
	};
});