/**
 * Refers to the fire action.
 * ラベル付けされたfire要素を参照します。
 * この要素は同名のラベルでラベル付けされたfire要素と同じに扱われます。
 * 参照されたfire要素内の変数は、<param>要素に指定された数値に 置き換えられます。
 */
define(['bulletml/command/commandType', 'util/format'], function(CommandType, format) {
	var fireRef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.params = spec.params || [];

        /**
         * Return tag type.
         * @public
         * @return {String} CommandType.FIRE_REF
         */
        that.commandType = function() {
            return CommandType.FIRE_REF;
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
            return format('<FireRef label=%1, params=%2>', that.label, that.params);
        };
        
        return that;
    };

    return fireRef;
});