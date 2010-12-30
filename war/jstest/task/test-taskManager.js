define(
[
    'task/task',
    'task/taskManager'
],
function(task, taskManager) {
    module('taskManager');

    test('taskSystem が null でないことを確認', function() {
        same(!!taskManager, true);
    });

    test('update が 全管理タスクの update の呼び出しが成功することを確認', function() {
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

        taskManager.addTask(stubTask());
        taskManager.addTask(stubTask());

        taskManager.update();

        same(2, count);
    });

    test('draw が 全管理タスクの draw の呼び出しが成功することを確認', function() {
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

        taskManager.addTask(stubTask());
        taskManager.addTask(stubTask());

        taskManager.draw();

        same(2, count);
    });
});