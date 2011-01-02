define(
[
    'bulletml/task/taskFactory',
    'bulletml/schema/ActionDef'
],
function(taskFactory, ActionDef) {
    module('taskFactory');

    test('actionTask が作成できることを確認', function() {
        var actionDef = ActionDef();
        var task1 = taskFactory.createTask('action', { actionDef: actionDef });

        same(task1.type(), 'action');
    });

    test('サポートしていない type を指定すると例外が発生することを確認', function() {
        try {
            taskFactory.createTask('unspoortedType');
            raise(false, 'fail');
        } catch (e) {
            ok(true, 'ok');
        }
    });

});