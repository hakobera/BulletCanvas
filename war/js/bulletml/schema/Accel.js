/**
 * Accelerates a bullet	
 * 弾を水平方向に<horizontal>、垂直方向に<vertical>、 <term>フレームかけて加速します。
 */
define(['util/messageFormat'], function(fmt) {
	var accel = function(spec) {
        var that = {};
		that.horizontal = spec.horizontal;
		that.vertical = spec.vertical;
		that.term = spec.term;

        that.toString = function() {
            return fmt.format(
                    '[Accel] horizontal=%1, vertical=%2, term=%3',
                    that.horizontal, that.vertical, that.term);
        };
        
        return that;
	};

    return accel;
});