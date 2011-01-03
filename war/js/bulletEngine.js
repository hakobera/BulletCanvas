require(['taskSystem'], function(TaskSystem) {
    require.ready(function() {
        var pad = $('#analogpad').analogpad();
        var taskSystem = TaskSystem();
        taskSystem.setController(pad);

        var url = '/bulletml/samples/sample1.xml';
        $.ajax({
            url: url,
            dataType: 'text',
            success: function(data) {
                $('#xml').val(data);
            }
        });

		$.ajax({
			url: url,
            cache: false,
			success: function(data) {
                taskSystem.init({
                    bulletML: data,
                    targetId: 'canvasBox',
                    rank: 5
                });
                taskSystem.play();

                var fpsTimer = taskSystem.getFpsTimer();
                $('#fps').text(fpsTimer.getAverageFps());
                setInterval(function() {
                    var v = Math.floor(fpsTimer.getAverageFps() * 10) / 10;
                    $('#fps').text(v);
                    $('#bulletCount').text(taskSystem.getBulletCount());
                }, 1000);

                $('#play').click(function() {
                   taskSystem.play(); 
                });

                $('#pause').click(function() {
                    taskSystem.pause();
                });

                $('#samples').change(function() {
                    var url = '/bulletml/samples/sample' + $(this).val() + '.xml'; 
                    $.ajax({
                        url: url,
                        dataType: 'text',
                        cache: false,
                        success: function(data) {
                            $('#xml').val(data);
                        }
                    });
                    $.ajax({
                        url: url,
                        cache: false,
                        success: function(data) {
                            taskSystem.reInit({
                                bulletML: data,
                                rank: 1
                            });
                            taskSystem.play();
                        }
                    });
                });
			}
		});
    });
});