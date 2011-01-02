/**
 * Specifies the parameter. * 
 * パラメタを指定します。
 */
define(['util/format'], function(format) {
	var param = function(spec) {
        var that = {};
        that.value = spec.value;

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return 'param';
        };

        that.toString = function() {
            return format('<Param value=%1>', that.value);
        };

        return that;
	};

    return param;	
});