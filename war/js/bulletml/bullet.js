define(['util/log'], function(log) {
	var BULLET_COLOR = [
		'#ffffff', '#ffaaaa', '#aaffaa', '#aaaaff'
	];
	var ACTION_MAX = 8;
	
	var index = 0;
	
	var Bullet = function() {
		this.id = ++index;
		this.live = false;
		this.actions = [];
		this.actionIndex = 0;
	};

	Bullet.prototype.changeAction = function(before, after) {
		for (var i = 0; i < actionIdex; ++i) {
			if (actions[i] === before) {
				actions[i] = after;
				return;
			}
		}
	};

	Bullet.prototype.init = function(x, y, colorIndex) {
		this.x = this.px = x;
		this.y = this.py = y;
		this.mx = this.my = 0;
		this.colorIndex = colorIndex % 3;
		this.count = 0;
		this.actionIndex = 0;
		this.actions = [];
		this.speed = 0;
		this.direction = 0;
	};
	
	Bullet.prototype.addAction = function(action) {
		if (this.actionIndex >= ACTION_MAX) {
			return;
		}
		this.actions[this.actionIndex] = action;
		++this.actionIndex;
	};
	
	Bullet.prototype.setBulletDef = function(bulletDef, x, y, colorIndex) {
		this.direction = bulletDef.getDirection();
		this.speed = bulletDef.getSpeed();
		var actions = bulletDef.getActions();
		setAction(actions, x, y, colorIndex);
	};
	
	Bullet.prototype.vanish = function() {
		for (var i = 0; i < this.actionIndex; ++i) {
			this.actions[i].vanish();
		}
		this.live = false;
	};
	
	Bullet.prototype.isAllActionFinished = function() {
		for (var i = 0; i < this.actionIndex; ++i) {
			if (this.actions[i].live) {
				return false;
			}
		}
		return true;
	};
	
	Bullet.prototype.move = function() {
		for (var i = 0; i < this.actionIndex; ++i) {
			this.actions[i].move();
		}
	};
	
	Bullet.prototype.draw = function(context) {
		context.fillStyle = BULLET_COLOR[this.colorIndex];
		context.fillRect(this.x, this.y, 5, 5);
	};
	
	return {
		create: function() {
			var instance = new Bullet();
			log.debug('create bullet', instance.id);
			return instance;
		}
	};
});