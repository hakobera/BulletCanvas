require(['taskSystem'], function(TaskSystem) {
    require.ready(function() {
        var pad = $('#analogpad').analogpad();
		$.ajax({
			url: '/bulletml/sample.xml',
            cache: false,
			success: function(data) {
                var taskSystem = TaskSystem({
                    bulletML: data,
                    targetId: 'canvasBox',
                    rank: 1
                });
                taskSystem.setController(pad);
                taskSystem.start();

                var fpsTimer = taskSystem.getFpsTimer();
                $('#fps').text(fpsTimer.getAverageFps());
                setInterval(function() {
                    var v = Math.floor(fpsTimer.getAverageFps() * 10) / 10;
                    $('#fps').text(v);
                    $('#bulletCount').text(taskSystem.getBulletCount());
                }, 1000);
			}
		});
    });
});