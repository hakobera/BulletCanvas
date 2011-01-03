/**
 * commandFactory.js - Factory method for command.
 */
define(
[
    'bulletml/command/commandType',
    'bulletml/command/actionCommand',
    'bulletml/command/changeDirectionCommand',
    'bulletml/command/fireCommand',
    'bulletml/command/repeatCommand',
    'bulletml/command/vanishCommand',
    'bulletml/command/waitCommand'
],
function(
    CommandType,
    actionCommand,
    changeDirectionCommand,
    fireCommand,
    repeatCommand,
    vanishCommand,
    waitCommand
) {
    var constructors = {}
    constructors[CommandType.ACTION] = actionCommand;
    constructors[CommandType.CHANGE_DIRECTION] = changeDirectionCommand;
    constructors[CommandType.FIRE] = fireCommand;
    constructors[CommandType.REPEAT] = repeatCommand;
    constructors[CommandType.VANISH] = vanishCommand;
    constructors[CommandType.WAIT] = waitCommand;

    return {
        createCommand: function(commandDef, spec) {
            var type = commandDef.commandType();
            var constructor = constructors[type];
            if (!constructor) {
                throw Error('[commandFactory] constructor not found fot type = ' + type);
            }
            return constructor(commandDef, spec);
        }
    };
});