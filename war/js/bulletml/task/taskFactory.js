define(
[
    'bulletml/task/actionTask'
],
function(actionTask) {
    var constructors = {
        'action': actionTask    
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