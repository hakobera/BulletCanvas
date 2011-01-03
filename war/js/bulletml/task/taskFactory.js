define(
[
    'bulletml/task/taskType',
    'bulletml/task/playerTask',
    'bulletml/task/enemyTask',
    'bulletml/task/bulletTask'
],
function(TaskType, playerTask, enemyTask, bulletTask) {
    var constructors = {};
    constructors[TaskType.PLAYER] =  playerTask;
    constructors[TaskType.ENEMY] =  enemyTask;
    constructors[TaskType.BULLET] =  bulletTask;

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