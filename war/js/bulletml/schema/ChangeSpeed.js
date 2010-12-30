/**
 * Changes the speed of bullet	
 * 弾の速度を<speed>に<term>フレームかけて変えます。
 */
define(['util/messageFormat'], function(fmt) {
	var changeSpeed = function(spec) {
        var that = {};
        that.speed = spec.speed;
        that.term = spec.term;

        that.toString = function() {
            return fmt.format('[ChangeSpeed] speed=%1, term=%2', that.speed, that.term);
        };

        return that;
    };

    return changeSpeed;
});