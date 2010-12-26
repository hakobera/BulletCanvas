/**
 * Fires a bullet.
 * 弾を<direction>度方向に速度<speed>で撃ちます。 ラベル付けされたfire要素は、fireRef要素によって参照されます。
 */
define([
  'util/messageFormat',
	'danmaku/bulletml/Direction',
	'danmaku/bulletml/Speed'
],
function(fmt, Direction, Speed) {
	var FireDef = function(params) {
		this.label = params.label;
		this.direction = params.direction;
		this.speed = params.speed;
	};
	
	var pt = FireDef.prototype;
	pt.toString = function() {
		return fmt.format(
				'[FireDef] label=%1, direction=%2, speed=%3',
				(this.label ? this.label : ''),
				this.direction,
				this.speed);
	};

	return {
		create: function(node, parser) {
			var label = node.attributes.label ? node.attributes.label.value : null;
			var direction = Direction.defaultValue();
			var speed = Speed.defaultValue();
			var childNodes = node.childNodes;
			var len = childNodes.length;
			
			for (var i = 0; i < len; ++i) {
				var tag = childNodes[i];
				if (tag.nodeType === 1/*element*/) {
					var tagName = tag.tagName;
					switch (tagName) {
					case 'direction':
						direction = Direction.create(tag, parser);
						break;
					
					case 'speed':
						speed = Speed.create(tag, parser)
						break;
					}
				}
			}
			
			return new FireDef({
			  label: label,
				direction: direction,
				speed: speed
			});
		}
	};
});