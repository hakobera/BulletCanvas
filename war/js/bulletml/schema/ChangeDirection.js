/**
 * Changes the direction of bullet	
 * 弾の方向を<direction>度に<term>フレームかけて曲げます。
 * 1フレームは1/30秒です。
 */
define(['util/format'], function(format) {
	var changeDirection = function(spec) {
        var that = {};
        that.direction = spec.direction;
        that.term = spec.term;

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return 'changeDirection';
        };

        that.toString = function() {
            return format(
                    '<ChangeDirection direction=%1, term=%2>',
                    that.direction, that.term);
        };

        return that;
    };

    return changeDirection;
});