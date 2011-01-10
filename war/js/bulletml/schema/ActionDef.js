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
         * Return command type.
         * @public
         * @return {String} CommandType.ACTION
         */
        that.commandType = function() {
            return CommandType.ACTION;
        };

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            other.label = that.label;
            other.commands = [];
            for (var i = 0; i < that.commands.length; ++i) {
                other.commands[i] = that.commands[i].clone();
            }
            return other;
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