define(
[
    'bulletml/task/actionTask'
],
function(actionTask) {
    module('actionTask');

    test('type() で "action" が返ることを確認', function() {
        var task1 = actionTask();
        same(task1.type(), 'action');
    });

});