/**
 * Repeats an action.
 * アクションを<times>回繰り返します。
 */
define([
	'util/messageFormat',
	'danmaku/bulletml/Times',
	'danmaku/bulletml/ActionDef',
	'danmaku/bulletml/ActionRef'
],
function(fmt, Times, ActionDef, ActionRef) {
	var Repeat = function(times, action) {
		this.times = times;
		this.action = action;
	};
	
	var pt = Repeat.prototype;
	pt.toString = function() {
		return fmt.format('[Repeat] times=%1, action=%2', this.times, this.action);
	};
	
	return {
		create: function(node, parser) {
			var times;
			var action;
			var command;
			var childNodes = node.childNodes;
			var len = childNodes.length;

			for (var i = 0; i < len; ++i) {
				var tag = childNodes[i];
				if (tag.nodeType === 1/*element*/) {
					var tagName = tag.tagName;
					switch (tagName) {
					case 'times':
						times = Times.create(tag, parser);
						break;
					
					case 'action':
						action = require('danmaku/bulletml/ActionDef').create(tag, parser);
						break;
					
					case 'actionRef':
						action = ActionRef.create(tag, parser);
						break;
					}
				}
			}
			
			if (!times) {
				throw new Error('[repeat] <times> is required.');
			}
			
			if (!action) {
				throw new Error('[repeat] <action> or <actionRef> is required.');
			}
			
			return new Repeat(times, action);
		}
	};
});