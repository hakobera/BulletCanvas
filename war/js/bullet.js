require(['bullet/taskSystem'], function(TaskSystem) {
    require.ready(function() {
        var pad = $('#analogpad').analogpad();
		$.ajax({
			url: '/bulletml/sample.xml',
            cache: false,
			success: function(data) {
                var taskSystem = TaskSystem(data, 'canvasBox');
                taskSystem.setController(pad);
                taskSystem.start();

                var fpsTimer = taskSystem.getFpsTimer();
                $('#fps').text(fpsTimer.getAverageFps());
                setInterval(function() {
                    $('#fps').text(fpsTimer.getAverageFps());
                }, 1000);
			}
		});
    });
});