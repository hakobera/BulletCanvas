/**
 * Defines attributes of a bullet
 * 弾の方向、速度およびアクションを定義します。
 * ラベル属性でラベル名をつけることができます。
 * ラベル付けされたbullet要素は、bulletRef要素によって参照されます。
 */
define([
  'util/messageFormat',
  'danmaku/bulletml/Direction',
  'danmaku/bulletml/Speed',
  'danmaku/bulletml/ActionDef',
  'danmaku/bulletml/ActionRef'
],
function(fmt,
	Direction, Speed,
	ActionDef, ActionRef
) {
	var BulletDef = function(params) {
		this.label = params.label;
		this.direction = params.direction;
		this.speed = params.speed;
	};
	
	var pt = BulletDef.prototype;
	pt.toString = function() {
		return fmt.format(
				'[BulletDef] label=%1, direction=%2, speed=%3',
				(this.label ? this.label : ''),
				this.direction,
				this.speed);
	};

	return {
		create: function(node, parser) {
			var label = node.attributes.label ? node.attributes.label.value : null;
			var direction = Direction.defaultValue();
			var speed = Speed.defaultValue();
			var diretion = Direction.defaultValue();
			var actions = [];
			var childNodes = node.childNodes;
			var len = childNodes.length;
			var command;

			for (var i = 0; i < len; ++i) {
				var tag = childNodes[i];
				if (tag.nodeType === 1/*element*/) {
					var tagName = tag.tagName;
					switch (tagName) {
					case 'speed':
						speed = Speed.create(tag, parser);
						break;
					
					case 'direction':
						direction = Direction.create(tag, parser);
						break;

					case 'action':
						actions.push(ActionDef.create(tag, parser));
						break;
					
					case 'actionRef':
						actions.push(ActionRef.create(tag, parser));
						break;
					}
				}
			}
			
			return new BulletDef({
			  label: label,
				direction: direction,
				speed: speed,
				actions: actions
			});
		}
	};
});