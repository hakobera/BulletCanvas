/**
 * Defines the action of bullet.
 * 弾のアクションを定義します。
 * ラベル付けされたaction要素は、actionRef要素によって参照されます。
 */
define(['util/messageFormat'], function(fmt) {
	var actionDef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.commands = spec.commands;

        that.toString = function() {
            return fmt.format(
                    '[ActionDef] label=%1, commands=%2',
                    that.label, that.commands);
        };

        return that;
	};

    return actionDef;
});