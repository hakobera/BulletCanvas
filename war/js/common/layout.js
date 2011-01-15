define({
	init: function() {
		$.ajax({
			url: '/login/check',
			success: function(data) {
				$('#account').show().html(data.screenName);
				$('#login').remove();
				$('#logout').show();
				$('#newSpell').show();
			},
			error: function() {
                $('#login').click(function(event) {
                	event.preventDefault();
                	$('#loginServiceBox').toggle();
                });
				$('#loginWrapper').show();
			}
		});
	}
});