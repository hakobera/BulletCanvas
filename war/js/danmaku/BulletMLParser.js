var BulletMLParseException = function(msg) {
	this.name = 'BulletMLParseException';
	this.message = msg;
	this.description = '[' + this.name + '] ' + msg; 
};
BulletMLParseException.prototype = new Error();

define([
  'util/messageFormat',
  'danmaku/bulletml/ActionDef',
  'danmaku/bulletml/BulletDef',
  'danmaku/bulletml/FireDef'
],
function(fmt, ActionDef, BulletDef, FireDef) {
// private properties
	var actions = [];
	var labelToAction = {};
	
	var bullets = [];
	var labelToBullet = {};
	
	var fires = [];
	var labelToFire = {};
	
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
		var topActions = getChildNodesByTagName(root, 'action');
		for (var i = 0; i < topActions.length; ++i) {
			var action = ActionDef.create(topActions[i], this);
			labelToAction[action.label] = action; 
			actions.push(action);
		}
	};

	var parseTopBullets = function(root) {
		var topBullets = getChildNodesByTagName(root, 'bullet');
		var len = topBullets.length;
		for (var i = 0; i < len; ++i) {
			var bullet = BulletDef.create(topBullets[i], this);
			labelToBullet[bullet.label] = bullet; 
			bullets.push(bullet);
		}
	};

	var parseTopFires = function(root) {
		var topFires = getChildNodesByTagName(root, 'fire');
		var len = topFires.length;
		for (var i = 0; i < len; ++i) {
			var fire = FireDef.create(topFires[i], this);
			labelToFire[fire.label] = fire; 
			fires.push(fire);
		}
	};
	
	var reset = function() {
		actions = [];
		labelToAction = {};
		
		bullets = [];
		labelToBullet = {};
		
		fires = [];
		labelToFire = {};
	};
	
return {
	parse: function(bulletML) {
		reset();
		var root = bulletML.getElementsByTagName('bulletml')[0];
		parseTopBullets(root);
		parseTopFires(root);
		parseTopActions(root);
	},
	
	getActions: function() {
		return actions;
	},
	
	getBullets: function() {
		return bullets;
	},

	getFires: function() {
		return fires;
	},

	getActionDef: function(label) {
		return labelToAction[label];
	},
	
	getBulletDef: function(label) {
		return labelToBullet[label];
	},

	getFireDef: function(label) {
		return labelToFire[label];
	}
	
}
	
});
