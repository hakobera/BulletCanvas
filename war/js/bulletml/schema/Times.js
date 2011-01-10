/**
 * Specifies the number of times.
 * 繰り返し回数を指定します。
 */
define(['util/format'], function(format) {
	var times = function(spec) {
        var that = {};
        that.value = spec.value;

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            other.prototype = that;
            other.value = that.value;
            return other;
        };

        that.toString = function() {
            return format('<Times value=%1>', that.value);
        };

        return that;
	};

    return times;
});