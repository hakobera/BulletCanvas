/**
 * Changes the speed of bullet	
 * 弾の速度を<speed>に<term>フレームかけて変えます。
 */
define(['util/format'], function(format) {
	var changeSpeed = function(spec) {
        var that = {};
        that.speed = spec.speed;
        that.term = spec.term;

        /**
         * Return tag type.
         * @public
         */
        that.commandType = function() {
            return 'changeSpeed';
        };

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            other.speed = that.speed.clone();
            other.term = that.term.clone();
            return other;
        };

        that.toString = function() {
            return format(
                    '<ChangeSpeed speed=%1, term=%2>',
                    that.speed, that.term);
        };

        return that;
    };

    return changeSpeed;
});