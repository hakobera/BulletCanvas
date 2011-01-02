define(
[
    'bulletml/task/actionTask',
    'bulletml/schema/ActionDef'
 ],
function(actionTask, ActionDef) {
    module('actionTask');

    test('type() で "action" が返ることを確認', function() {
        var actionDef = ActionDef();
        var task1 = actionTask({ actionDef: actionDef });
        same(task1.type(), 'action');
    });

});