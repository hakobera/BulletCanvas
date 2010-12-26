/**
 * Changes the speed of bullet	
 * 弾の速度を<speed>に<term>フレームかけて変えます。
 */
define([
	'util/messageFormat',
	'danmaku/bulletml/Speed',
	'danmaku/bulletml/Term'
],
function(fmt, Speed, Term) {
	var ChangeSpeed = function(speed, term) {
		this.speed = speed;
		this.term = term;
	};
	
	var pt = ChangeSpeed.prototype;
	pt.toString = function() {
		return fmt.format('[ChangeSpeed] speed=%1, term=%2', this.speed, this.term);
	};
	
	return {
		create: function(node, parser) {
			var speed = Speed.defaultValue();
			var term;
			var p;
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
			
			if (!speed) {
				throw new Error('[changeSpeed] <speed> is required.');
			}
			
			if (!term) {
				throw new Error('[changeSpeed] <term> is required.');
			}
			
			return new ChangeSpeed(speed, term);
		}
	};
});