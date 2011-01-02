define(
[
    'bulletml/task/playerTask',
    'bulletml/task/actionTask',
    'bulletml/task/bulletTask'
],
function(playerTask, actionTask, bulletTask) {
    var constructors = {
        'player': playerTask,
        'action': actionTask,
        'bullet': bulletTask
    };

    return {
        createTask: function(type, spec) {
            var constructor = constructors[type];
            if (!constructor) {
                throw Error('[taskFactory] constructor not found fot type = ' + type);
            }
            return constructor(spec);
        }
    };
});