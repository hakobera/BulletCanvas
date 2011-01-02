define(
[
    'task/task'
],
function(task) {
    module('task');

    test('id が異なることを確認', function() {
        var task1 = task({});
        var task2 = task({});
        
        notStrictEqual(task1.id(), task2.id());
    });

    test('type() を呼び出すと例外が発生することを確認', function() {
        var task1 = task({});

        try {
            task.type();
            ok(false, 'fail');
        } catch (e) {
            ok(true, 'ok');
        }
    });

});