define(
[
    'task/task',
    'task/taskManager'
],
function(task, taskManager) {
    module('taskManager');

    test('taskManager が null でないことを確認', function() {
        same(!!taskManager, true);
    });

    test('update が 全管理タスクの update の呼び出しが成功することを確認', function() {
        var manager = taskManager();
        var count = 0;
        var stubTask = function(spec) {
            var that = task(spec);
            that.type = function() {
                return 'stub';
            };
            that.update = function() {
                ++count;
            }
            return that;
        };

        manager.addTask(stubTask());
        manager.addTask(stubTask());

        manager.update();

        same(2, count);
    });

    test('draw が 全管理タスクの draw の呼び出しが成功することを確認', function() {
        var manager = taskManager();
        var count = 0;
        var stubTask = function(spec) {
            var that = task(spec);
            that.type = function() {
                return 'stub';
            };
            that.draw = function() {
                ++count;
            }
            return that;
        };

        manager.addTask(stubTask());
        manager.addTask(stubTask());

        var drawContext = {} // dummy
        manager.draw(drawContext);

        same(2, count);
    });
});