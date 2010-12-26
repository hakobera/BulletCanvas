/**
 * Refers to the fire action.
 * ラベル付けされたfire要素を参照します。
 * この要素は同名のラベルでラベル付けされたfire要素と同じに扱われます。
 * 参照されたfire要素内の変数は、<param>要素に指定された数値に 置き換えられます。
 */
define([
  'util/messageFormat',
	'danmaku/bulletml/FireDef',
],
function(fmt, FireDef) {
	var FireRef = function(fireDef, params) {
		this.fireDef = fireDef;
		this.params = params;
	};
	
	var pt = FireRef.prototype;
	pt.toString = function() {
		return fmt.format('[FireRef] fireDef=%1, params=%2', this.fireDef, this.params);
	};
	
	return {
		create: function(node, parser) {
			var label = node.attributes.label;
			if (!label) {
				throw new Error('[fireRef] "label" attribute is required');
			}
			
			var fireDef = parser.getFireDef(lable.value);
			if (!fireDef) {
				throw new Error('[fireRef] fireDef not found for ' + label.value);;
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
			
			return new FireRef(fireDef, params);
		}
	};
});