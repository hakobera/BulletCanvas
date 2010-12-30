define(
[
    'bulletml/task/taskFactory'
],
function(taskFactory) {
    module('taskFactory');

    test('actionTask が作成できることを確認', function() {
        var task1 = taskFactory.createTask('action');

        same(task1.type(), 'action');
    });

    test('サポートしていない type を指定すると例外が発生することを確認', function() {
        try {
            taskFactory.createTask('unspoortedType');
            ok(false, 'fail');
        } catch (e) {
            ok(true, 'ok');
        }
    });

});