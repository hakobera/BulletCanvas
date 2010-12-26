/**
 * Defines the action of bullet.
 * 弾のアクションを定義します。
 * ラベル付けされたaction要素は、actionRef要素によって参照されます。
 */
define([
  'util/messageFormat',
  'danmaku/bulletml/Repeat',
  'danmaku/bulletml/FireDef',
  'danmaku/bulletml/FireRef',
  'danmaku/bulletml/ChangeSpeed',
  'danmaku/bulletml/ChangeDirection',
  'danmaku/bulletml/Accel',
  'danmaku/bulletml/Wait',
  'danmaku/bulletml/Vanish',
  'danmaku/bulletml/ActionRef'
],
function(fmt,
	Repeat, Fire, FireRef,
	ChangeSpeed, ChangeDirection,
	Accel, Wait, Vanish,
	ActionRef
) {
	var ActionDef = function(label, commands) {
		this.label = label;
		this.commands = commands;
	};
	
	var pt = ActionDef.prototype;
	pt.toString = function() {
		return fmt.format('[ActionDef] label=%1, commands=%2', (this.label ? this.label : ''), this.commands);
	};
	
	return {
		create: function(node, parser) {
			var label = node.attributes.label ? node.attributes.label.value : null;
			var commands = [];
			
			var childNodes = node.childNodes;
			var len = childNodes.length;
			var command;
			for (var i = 0; i < len; ++i) {
				var tag = childNodes[i];
				if (tag.nodeType === 1/*element*/) {
					var tagName = tag.tagName;
					switch (tagName) {
					case 'repeat':
						command = Repeat.create(tag, parser);
						break;
	
					case 'fire':
						command = Fire.create(tag, parser);
						break;
						
					case 'fireRef':
						command = FireRef.create(tag, parser);
						break;
					
					case 'changeSpeed':
						command = ChangeSpeed.create(tag, parser);
						break;
					
					case 'changeDirection':
						command = ChangeDirection.create(tag, parser);
						break;
					
					case 'accel':
						command = Accel.create(tag, parser);
						break;
					
					case 'wait':
						command = Wait.create(tag, parser);
						break;
					
					case 'vanish':
						command = Vanish.create(tag, parser);
						break;
					
					case 'action':
						command = this.create(tag, parser);
						break;
					
					case 'actionRef':
						command = ActionRef.create(tag, parser);
						break;
						
					default:
						throw new Error(fmt.format('<%1> is invalid', tagName));
					}
					
					commands.push(command);
				}
			}
			
			return new ActionDef(label, commands);
		}
	};	
});