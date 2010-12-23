define({
	getXML: function(url, success) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				if (this.responseXML) {
					success(this.responseXML);
				}
			}
		};
		xhr.open('GET', url);
		xhr.send();
	},
	
	getText: function(url, success) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				if (this.responseText) {
					success(this.responseText);
				}
			}
		};
		xhr.open('GET', url);
		xhr.send();
	}
});
