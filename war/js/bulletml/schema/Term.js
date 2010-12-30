/**
 * Specifies a term.
 * 期間を指定します。
 */
define(['util/messageFormat'], function(fmt) {
	var term = function(spec) {
		var that = {};
        that.value = spec.value;

        that.toString = function() {
            return fmt.format('[Term] value=%1', that.value);
        };
        
        return that;
        this.value = val
	};

    return term;
});