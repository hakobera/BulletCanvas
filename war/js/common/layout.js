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
		}
	};
});