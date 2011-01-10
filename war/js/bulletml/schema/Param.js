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

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            other.value = that.value;
            return other;
        };

        that.toString = function() {
            return format('<Param value=%1>', that.value);
        };

        return that;
	};

    return param;	
});