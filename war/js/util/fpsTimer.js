/**
 * fpsTimer.js - FPS timer module.
 */
define(function() {
    /**
     * ブレークポイントなどで処理が長時間止まっていた場合の対策のため、
     * デルタ時間の最大値を設定し、それを超えないようにしておきます。
     */
    var MAX_DELTA = 500; // 500ms = 2 FPS

    var fpsTimer = function(spec) {
        var that = {};

        /**
         * Frames per second.
         * @private
         */
        var fps = spec.fps;

        /**
         * Interval between each frames.
         */
        var UPDATE_INTERVAL = 1000 / fps;

        /**
         * Interval timer ID.
         */
        var timerId;

        /**
         * Callback function for each update.
         */
        var callback = spec.callback;

        var totalTime = 0;
        var prevTick = 0;
        var fpsTime = 0;
        var fpsFrameCount = 0;
        var averageFps = fps;
        var updateInTime = true;

        /**
         * Update timer.
         * @private
         */
        var update = function() {
            var currentTick = new Date().getTime();
		    var delta =  currentTick - prevTick;
            delta = Math.min(delta, MAX_DELTA);
            updateInTime = delta < (UPDATE_INTERVAL + 5);
		    prevTick = currentTick;
            totalTime += delta;
            fpsTime += delta;
		    ++fpsFrameCount;
		    if (fpsTime >= 1000) {
			    averageFps = fpsFrameCount / (fpsTime / 1000);
			    fpsTime -= 1000;
			    fpsFrameCount = 0;
		    }
            callback();
        };

        /**
         * Return avarage FPS count.
         * @return {float} FPS
         */
        that.getAverageFps = function() {
            return averageFps;
        };

        /**
         * Start timer.
         * @public
         */
        that.start = function() {
            prevTick = new Date().getTime();
            timerId = setInterval(update, UPDATE_INTERVAL);
        };
        
        /**
         * Pause timer.
         * @public
         */
        that.pause = function() {
            if (timerId) {
                clearInterval(timerId);
            }
            timerId = null;
        };

        /**
         * Reset timer.
         * @public
         */
        that.reset = function() {
            that.pause();
            timerId = null;
            totalTime = 0;
            prevTick = 0;
            fpsTime = 0;
            fpsFrameCount = 0;
            averageFps = fps;
            updateInTime = true;
        };

        /**
         * Update in setted interval time.
         */
        that.updateInTime = function() {
            return updateInTime;
        };

        return that;
    };

    return fpsTimer;
});