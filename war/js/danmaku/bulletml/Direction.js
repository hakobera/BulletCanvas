define(function() {
	var Direction = function(type, value) {
		this.type = type ? type.value : 'aim';
		this.value = value;
	};
	
	return {
		create: function(node) {
			var type = node.attributes['type'];
			var value = node.textContent;
			return new Direction(type, value);
		}
	}
});