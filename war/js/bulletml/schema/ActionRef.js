/**
 * Refers to the action
 * ラベル付けされたaction要素を参照します。 
 * この要素は同名のラベルでラベル付けされたaction要素と同じに扱われます。
 * 参照されたaction要素内の変数は、<param>要素に指定された数値に 置き換えられます
 */
define(['bulletml/command/commandType', 'util/format'], function(CommandType, format) {
	var actionRef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.params = spec.params;

        /**
         * Return command type.
         * @public
         * @return {String} CommandType.ACTION_REF
         */
        that.commandType = function() {
            return CommandType.ACTION_REF;
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
            other.params = [];
            for (var i = 0; i < that.params.length; ++i) {
                other.params[i] = that.params[i].clone();
            }
            return other;
        };

        that.toString = function() {
            return format(
                    '<ActionRef label=%1, params=%2>',
                    that.label, that.params);
        };

        return that;
	};

    return actionRef;
});