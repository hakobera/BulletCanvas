/**
 * Refers to the bullet.
 * ラベル付けされたbullet要素を参照します。 
 * この要素は同名のラベルでラベル付けされたbullet要素と同じに扱われます。
 * 参照されたbullet要素内の変数（$1, $2, $3, ...）は、 
 * <param>要素に指定された数値に置き換えられます。
 *  （最初に出現したparam要素が$1に、次に出現したparam要素が$2に、...）
 */
define([
  'util/messageFormat',
	'danmaku/bulletml/BulletDef',
],
function(fmt, BulletDef) {
	var BulletRef = function(bulletDef, params) {
		this.bulletDef = bulletDef;
		this.params = params;
	};
	
	var pt = BulletRef.prototype;
	pt.toString = function() {
		return fmt.format('[BulletRef] bulletDef=%1, params=%2', this.bulletDef, this.params);
	};
	
	return {
		create: function(node, parser) {
			var label = node.attributes.label;
			if (!label) {
				throw new Error('[bulletRef] "label" attribute is required');
			}
			
			var bulletDef = parser.getBulletDef(label.value);
			if (!bulletDef) {
				throw new Error('[bulletRef] bulletDef not found for ' + label.value);;
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
			
			return new BulletRef(bulletDef, params);
		}
	};
});