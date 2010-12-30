/**
 * Specifies the parameter. * 
 * パラメタを指定します。
 */
define(['util/messageFormat'], function(fmt) {
	var param = function(spec) {
        var that = {};
        that.value = spec.value;

        that.toString = function() {
            return fmt.format('[Param] value=%1', that.value);
        };

        return that;
	};

    return param;	
});