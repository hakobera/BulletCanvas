/**
 * Specifies a term.
 * 期間を指定します。
 */
define(['util/format'], function(format) {
	var term = function(spec) {
		var that = {};
        that.value = spec.value;

        that.toString = function() {
            return format('<Term value=%1>', that.value);
        };
        
        return that;
        this.value = val
	};

    return term;
});