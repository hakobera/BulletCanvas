/**
 * Changes the direction of bullet	
 * 弾の方向を<direction>度に<term>フレームかけて曲げます。
 * 1フレームは1/30秒です。
 */
define(['util/messageFormat'], function(fmt) {
	var changeDirection = function(spec) {
        var that = {};
        that.direction = spce.direction;
        that.term = spec.term;

        that.toString = function() {
            return fmt.format('[ChangeDirection] direction=%1, term=%2', that.direction, that.term);
        };

        return that;
    };

    return changeDirection;
});