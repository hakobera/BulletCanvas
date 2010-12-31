require([],
	function() {
		require.ready(function() {
			$.ajax({
				url: '/login/check',
				success: function(data) {
					$('#account').show().html(data.screenName);
					$('#login').remove();
					$('#logout').show();
					$('#newSpell').show();
				},
				error: function() {
                    $('#login').click(function(e) {
                        e.preventDefault();
                        $('#loginServiceBox').toggle();
                    });
					$('#login').show();
				}
			});
		});
	}
);