/**
 * commandFactory.js - Factory method for command.
 */
define(
[
    'bulletml/command/fireCommand',
    'bulletml/command/repeatCommand',
    'bulletml/command/vanishCommand',
    'bulletml/command/waitCommand'
],
function(
    fireCommand,
    repeatCommand,
    vanishCommand,
    waitCommand
) {
    var constructors = {
        'fireDef': fireCommand,
        'repeat': repeatCommand,
        'vanish': vanishCommand,
        'wait': waitCommand
    };

    return {
        createCommand: function(commandDef, taskSystem) {
            var type = commandDef.commandType();
            var spec = { taskSystem: taskSystem, commandDef: commandDef };
            var constructor = constructors[type];
            if (!constructor) {
                throw Error('[commandFactory] constructor not found fot type = ' + type);
            }
            return constructor(spec);
        }
    };
});