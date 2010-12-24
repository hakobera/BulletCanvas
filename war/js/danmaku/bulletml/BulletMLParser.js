var BulletMLParseException = function(msg) {
	this.name = 'BulletMLParseException';
	this.message = msg;
	this.description = '[' + this.name + '] ' + msg; 
};
BulletMLParseException.prototype = new Error();

define([
  'util/messageFormat',
  'danmaku/bulletml/FireDef'
],
function(fmt, FireDef) {
// private properties
	var topActions;
	var topBullets;
	var topFires;
	
// private functions
	var getChildNodeByTagName = function(node, tagName) {
		var len = node.childNodes.length;
		for (var i = 0; i < len; i++) {
			var c = node.childNodes[i];
				if (c.tagName === tagName) {
					return c;
				}
		}
		return null;
	};

	var getChildNodesByTagName = function(node, tagName) {
		var children = [];
		var len = node.childNodes.length;
		for (var i = 0; i < len; i++) {
			var c = node.childNodes[i];
				if (c.tagName === tagName) {
					children.push(c);
				}
		}
		return children;
	};
	
	var parseTopActions = function(root) {
		topActions = getChildNodesByTagName(root, 'action');
	};

	var parseTopBullets = function(root) {
		topBullets = getChildNodesByTagName(root, 'bullet');
	};

	var parseTopFires = function(root) {
		topFires = getChildNodesByTagName(root, 'fire');
		var len = topFires.length;
		for (var i = 0; i < len; ++i) {
			FireDef.create(topFires[i]);
		}
	};
	
return {
	parse: function(bulletML) {
		var root = bulletML.getElementsByTagName('bulletml')[0];
		parseTopBullets(root);
		parseTopFires(root);
		parseTopActions(root);
	}
}
	
});
