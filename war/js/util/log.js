define([
	'util/messageFormat'
],
function(fmt) {
	var logger = document.getElementById('log');
	
	var zeroPad = function(n, size) {
		var s = '' + n;
		while (s.length < size) {
			s = '0' + s;
		}
		return s;
	}
	
	var time = function() {
		var d = new Date();
		return fmt.format('%1/%2/%3 %4:%5:%6.%7', 
											d.getFullYear(), zeroPad((d.getMonth()+1), 2), zeroPad(d.getDate(), 2),
											zeroPad(d.getHours(), 2), zeroPad(d.getMinutes(), 2), zeroPad(d.getSeconds(), 2),
											zeroPad(d.getMilliseconds(), 3));
	} 
	
	var log = function(type, messages) {
		var message = time() + ' [' + type + ']';
		for (var i = 0; i < messages.length; ++i) {
			message += (' ' + messages[i]);
		}
		var li = document.createElement('li');
		var span = document.createElement('span');
		span.setAttribute('class', type + 'Log');
		span.innerHTML = message;
		li.appendChild(span);
		logger.insertBefore(li, logger.firstChild);
	}
	
	return {
		debug: true,
		
		info: function() {
			log('info', arguments);
		},
		
		debug: function() {
			if (this.debug) {
				log('debug', arguments);
			}
		}
	}
	
});