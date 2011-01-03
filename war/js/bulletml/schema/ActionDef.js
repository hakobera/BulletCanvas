/**
 * Defines the action of bullet.
 * 弾のアクションを定義します。
 * ラベル付けされたaction要素は、actionRef要素によって参照されます。
 */
define(['bulletml/command/commandType', 'util/format'], function(CommandType, format) {
	var actionDef = function(spec) {
        var that = {};
        that.label = (spec && spec.label) ? spec.label : null;
        that.commands = (spec && spec.commands) ? spec.commands : [];

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return CommandType.ACTION;
        };

        that.toString = function() {
            return format(
                    '<ActionDef label=%1, commands=%2>',
                    that.label, that.commands);
        };

        return that;
	};

    return actionDef;
});