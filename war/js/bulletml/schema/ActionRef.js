/**
 * Refers to the action
 * ラベル付けされたaction要素を参照します。 
 * この要素は同名のラベルでラベル付けされたaction要素と同じに扱われます。
 * 参照されたaction要素内の変数は、<param>要素に指定された数値に 置き換えられます
 */
define(['util/format'], function(format) {
	var actionRef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.params = spec.params;

        that.toString = function() {
            return format(
                    '<ActionRef label=%1, params=%2>',
                    that.label, that.params);
        };

        return that;
	};

    return actionRef;
});