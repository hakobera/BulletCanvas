require(['taskSystem', 'util/url'], function(TaskSystem, Url) {
    require.ready(function() {
        var FPS = 60;

        var pad = $('#analogpad').analogpad();
        var taskSystem = TaskSystem();
        taskSystem.setController(pad);
        
        var params = Url.params(window.location.href);
        if (!params.spellCode) {
        	alert('Error invalid spell code');
        	return;
        }
        
        $.ajax({
            url: '/api/spellDefinition/' + params.spellCode,
            type: 'GET',
            dataType: 'xml',
            success: function(data) {
                taskSystem.init({
                    bulletML: data,
                    targetId: 'canvasBox',
                    rank: 5,
                    fps: FPS
                });

                var fpsTimer = taskSystem.getFpsTimer();
                $('#fps').text(fpsTimer.getAverageFps());
                setInterval(function() {
                    var v = Math.floor(fpsTimer.getAverageFps() * 10) / 10;
                    $('#fps').text(v);
                    $('#bulletCount').text(taskSystem.getBulletCount());
                }, 1000);

                var play = $('#play');
                var pause = $('#pause');

                play.click(function() {
                    taskSystem.play();
                    play.hide();
                    pause.show();
                });

                pause.click(function() {
                    taskSystem.pause();
                    pause.hide();
                    play.show();
                });

                play.triggerHandler('click');
                
                if (params.edit) {
	                $('#capture').show().click(function(event) {
	                	event.preventDefault();
	                	var imageData = taskSystem.captureScreen();
	                	$.ajax({
	                		url: '/api/spellThumbnail/' + params.spellCode,
	                		type: 'POST',
	                		data: { thumbnailDataUrl: imageData },
	                		success: function(data) {
	                			if (parent && parent.updateThumbnail) {
                                    parent.updateThumbnail(data);
                                }
	                		},
	                		error: function() {
	                			alert('Error update thumbnail');
	                		}
	                	});
	                });
                } else {
                	$('#capture').remove();
                }
            }
        });
    });
});