define([
	'util/messageFormat'
],
function(fmt) {
	var Speed = function(type, value) {
		this.type = type ? type.value : 'absolute';
		this.value = value;
	};
	
	var p = Speed.prototype;
	p.toString = function() {
		fmt.format('[Speed] type=%1, value=%2', this.type, this.value);
	};
	
	return {
		create: function(node) {
			var type = node.attributes['type'];
			var value = node.textContent;
			return new Speed(type, value);
		}
	}
});