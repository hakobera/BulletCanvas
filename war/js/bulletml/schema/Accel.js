/**
 * Accelerates a bullet	
 * 弾を水平方向に<horizontal>、垂直方向に<vertical>、 <term>フレームかけて加速します。
 */
define(['util/format'], function(format) {
	var accel = function(spec) {
        var that = {};
		that.horizontal = spec.horizontal;
		that.vertical = spec.vertical;
		that.term = spec.term;

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return 'accel';    
        };

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            other.horizontail = that.horizontail.clone();
            other.vertical = that.vertical.clone();
            other.term = that.term.clone();
            return other;
        };

        that.toString = function() {
            return format(
                    '<Accel horizontal=(%1), vertical=(%2), term=(%3)>',
                    that.horizontal, that.vertical, that.term);
        };
        
        return that;
	};

    return accel;
});