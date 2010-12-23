/**
 * 自機オブジェクト。
 */
define(['util/log'], function(log) {
	var NOT_EXIST = -1;

	var index = 0;

	var random = function() {
		return Math.random()*32+1 | 0
	};
	
	var Frag = function() {
		this.id = ++index;
		this.live = false;
		this.count = NOT_EXIST;
		this.color = '#ff2222';
	};
	
	Frag.prototype.set = function(x, y) {
		this.live = true;
		this.x = x;
		this.y = y;
		this.mx = random();
		this.my = random();
		this.count = 32 + random();
	};
	
	Frag.prototype.move = function() {
		if (this.live) {
			this.px = this.x;
			this.py = this.y;
			this.x += (this.mx*2);
			this.y += (this.my*2);
			--this.count;
		}
	};
	
	Frag.prototype.draw = function(context) {
		if (this.live) {
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, 10, 10);
		}
	};
	
	return {
		create: function() {
			var instance = new Frag();
			log.debug('create frag', instance.id);
			return instance;
		}
	};
});