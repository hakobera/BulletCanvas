/**
 * Changes the direction of bullet	
 * 弾の方向を<direction>度に<term>フレームかけて曲げます。
 * 1フレームは1/30秒です。
 */
define([
	'util/messageFormat',
	'danmaku/bulletml/Direction',
	'danmaku/bulletml/Term'
],
function(fmt, Direction, Term) {
	var ChangeDirection = function(direction, term) {
		this.direction = direction;
		this.term = term;
	};
	
	var pt = ChangeDirection.prototype;
	pt.toString = function() {
		return fmt.format('[ChangeDirection] direction=%1, term=%2', this.direction, this.term);
	};
	
	return {
		create: function(node, parser) {
			var direction = Direction.defaultValue();
			var term;
			var childNodes = node.childNodes;
			var len = childNodes.length;
			
			for (var i = 0; i < len; ++i) {
				var tag = childNodes[i];
				if (tag.nodeType === 1/*element*/) {
					var tagName = tag.tagName;
					switch (tagName) {
					case 'speed':
						speed = Speed.create(tag, parser)
						break;

					case 'term':
						term = Term.create(tag, parser);
						break;
					}
				}
			}
			
			if (!direction) {
				throw new Error('[changeDirection] <direction> is required.');
			}
			
			if (!term) {
				throw new Error('[changeDirection] <term> is required.');
			}
			
			return new ChangeDirection(direction, term);
		}
	};
});