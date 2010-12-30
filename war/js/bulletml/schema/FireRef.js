/**
 * Refers to the fire action.
 * ラベル付けされたfire要素を参照します。
 * この要素は同名のラベルでラベル付けされたfire要素と同じに扱われます。
 * 参照されたfire要素内の変数は、<param>要素に指定された数値に 置き換えられます。
 */
define(['util/format'], function(format) {
	var fireRef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.params = spec.params;

        that.toString = function() {
            return format('<FireRef label=%1, params=%2>', that.label, that.params);
        };
        
        return that;
    };

    return fireRef;
});