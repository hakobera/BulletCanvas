/**
 * Defines the action of bullet.
 * 弾のアクションを定義します。
 * ラベル付けされたaction要素は、actionRef要素によって参照されます。
 */
define(['util/format'], function(format) {
	var actionDef = function(spec) {
        var that = {};
        that.label = (spec && spec.label) ? spec.label : null;
        that.commands = (spec && spec.commands) ? spec.commands : [];

        that.toString = function() {
            return format(
                    '<ActionDef label=%1, commands=%2>',
                    that.label, that.commands);
        };

        return that;
	};

    return actionDef;
});