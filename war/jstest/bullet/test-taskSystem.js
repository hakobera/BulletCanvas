define(
[
    'bullet/taskSystem',
    'lib/debug'
],
function(TaskSystem, debug) {
    module('taskSystem');

    var canvasId = 'canvasBox';
    var canvasBox = document.createElement('div');
    canvasBox.setAttribute('id', canvasId);
    canvasBox.style.display = 'none';
    document.body.appendChild(canvasBox);

    asyncTest('BulletML で初期化できることを確認', function() {
        stop();
  		$.ajax({
			url: '/bulletml/template.xml',
			cache: false,
			success: function(data) {
				start();
                var taskSystem = TaskSystem(data, canvasId);
                taskSystem.start();
                
                same(taskSystem.status(), 'playing');
            }
		});
    });

    asyncTest('start, play, pause, reset が呼び出しでステータスが変更されることを確認', function() {
        stop();
  		$.ajax({
			url: '/bulletml/template.xml',
			cache: false,
			success: function(data) {
				start();
                var taskSystem = TaskSystem(data, canvasId);
                taskSystem.start();
                same(taskSystem.status(), 'playing');

                taskSystem.pause();
                same(taskSystem.status(), 'pause');

                taskSystem.play();
                same(taskSystem.status(), 'playing');

                taskSystem.reset();
                same(taskSystem.status(), 'stop');
            }
		});
    });

});