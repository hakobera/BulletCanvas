/**
 * Refers to the action
 * ラベル付けされたaction要素を参照します。 
 * この要素は同名のラベルでラベル付けされたaction要素と同じに扱われます。
 * 参照されたaction要素内の変数は、<param>要素に指定された数値に 置き換えられます
 */
define([
  'util/messageFormat',
	'danmaku/bulletml/ActionDef',
],
function(fmt, ActionDef) {
	var ActionRef = function(actionDef, params) {
		this.actionDef = actionDef;
		this.params = params;
	};
	
	var pt = ActionRef.prototype;
	pt.toString = function() {
		return fmt.format('[ActionRef] actionDef=%1, params=%2', this.actionDef, this.params);
	};
	
	return {
		create: function(node, parser) {
			var label = node.attributes.label;
			if (!label) {
				throw new Error('[actionRef] "label" attribute is required');
			}
			
			var actionDef = parser.getActionDef(label.value);
			if (!actionDef) {
				throw new Error('[actionRef] actionDef not found for ' + label.value);;
			}
			
			var params = [];
			var p;
			var childNodes = node.childNodes;
			var len = childNodes.length;
			
			for (var i = 0; i < len; ++i) {
				var tag = childNodes[i];
				if (tag.nodeType === 1/*element*/) {
					var tagName = tag.tagName;
					switch (tagName) {
					case 'param':
						p = Param.create(paramNodes[i]);
						params.push(p.value);
						break;
					}
				}
			}
			
			return new ActionRef(actionDef, params);
		}
	};
});