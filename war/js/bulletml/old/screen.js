define(function() {
	var screen = document.getElementById('screen');
	var screenContext = screen.getContext('2d');
	
	return {
		getWidth: function() {
			return screen.width;
		},
		
		getHeight: function() {
			return screen.height;
		},
		
		getContext: function() {
			return screenContext;
		},
		
		clear: function() {
			screenContext.save();
			screenContext.fillStyle = '#ccc';
			screenContext.fillRect(0, 0, screen.width, screen.height);
			screenContext.restore();
		}
	};
});