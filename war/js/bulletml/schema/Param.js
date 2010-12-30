/**
 * Specifies the parameter. * 
 * パラメタを指定します。
 */
define(['util/format'], function(format) {
	var param = function(spec) {
        var that = {};
        that.value = spec.value;

        that.toString = function() {
            return format('<Param value=%1>', that.value);
        };

        return that;
	};

    return param;	
});