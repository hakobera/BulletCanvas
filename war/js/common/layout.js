define(['text!../../template/login.html', 'text!../../template/menu.html'],
function(login, menu) {
	return {
		init: function() {
			$.ajax({
				url: '/login/check',
				success: function(data) {
					$.tmpl(menu, data).appendTo($('#topnavi'));
				},
				error: function() {
					$.tmpl(login).appendTo($('#topnavi'));
	                $('#login').click(function(event) {
	                	event.preventDefault();
	                	$('#loginServiceBox').toggle();
	                });
				}
			});
		},
		
		showSpellCard: function(url, template, target, angle) {
            $.ajax({
                url: url,
                cache: false,
                success: function(data) {
                    $.tmpl(template, data, {
                    	trim: function(s, len) {
                    		if (s && typeof s === 'string') {
	                    		s = s.replace(/\n|\r|\n\r/g, '');
	                    		if (s.length >= len) {
	                    			s = s.substring(0, len) + '...';
	                    		}
	                    		return s;
                    		}
                    		return '';
                    	}
                    }).appendTo(target);

                    $('.thumbnail', target).each(function() {
                        var self = $(this);
                        var dataUrl = $(this).attr('data-url');
                        $.get(dataUrl, function(data) {
                            var img = $('<img>').attr({ src: data, width: 175, height: 175 });
                            img.appendTo(self);
                        });
                    });

                    if (angle) {
	                    $('article', target).each(function() {
	                        var deg = Math.random() * 15;
	                        deg = Math.random() > 0.5 ? deg : -deg;
	                        $(this).css({ 'display': 'inline-block', '-moz-transform': 'rotate(' + deg + 'deg)', '-webkit-transform': 'rotate(' + deg + 'deg)' })
	                    });
                    } else {
	                    $('article', target).each(function() {
	                        $(this).css({ 'display': 'inline-block' })
	                    });
                    }
                }
            });        
		}
	};
});