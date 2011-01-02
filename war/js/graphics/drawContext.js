define(
[
    'graphics/canvas'
],
function(canvas) {
    var MATH_2PI = 2 * Math.PI;
    var RADIAN_UNIT = Math.PI / 180;

    /**
     * Convert angle unit degree to radian.
     * @public
     * @param angle {float} angle(degree)
     * @return Converted angle(radian)
     */
    var radian = function(angle) {
        return angle * RADIAN_UNIT;
    };

    /**
     * @constructor
     * @param spec
     */
    var drawContext = function(spec) {
        var that = {};

        var node = spec.node;
        var width = spec.width;
        var height = spec.height;
        var screen = canvas(width, height);
        var context = screen.getContext();
        var clearColor = spec.clearColor ? spec.clearColor : '#000';

        screen.bind(node);
        
        /**
         * Clear all pixels in drawing context.
         */
        that.clear = function() {
            context.save();
            context.fillStyle = clearColor;
            context.fillRect(0, 0, width, height);
            context.restore();
        };

        /**
         * Copy back buffer data to front buffer.
         */
        that.flip = function() {
            screen.flip();
        };

        /**
         * Draw fill rectangle.
         * @param x x coordinate (px)
         * @param y y coordinate (px)
         * @param w width (px)
         * @param h height (px)
         * @param style fill style
         */
        that.drawRect = function(x, y, w, h, style) {
            if (x < 0 || y < 0 || x > width || y > height) {
                return;
            }

            context.save();
            context.fillStyle = style;
            context.translate(x, y);
            context.fillRect(0, 0 , w, h);
            context.restore();
        };

        /**
         * Draw fill rectangle.
         * @param x x coordinate (px)
         * @param y y coordinate (px)
         * @param r radius (px)
         * @param style fill style
         */
        that.drawCircle = function(x, y, r, style) {
            if (x < -r || y < -r || x > (width+r) || y > (height+r)) {
                return;
            }

            context.save();
            context.fillStyle = style;
            context.translate(x, y);
            context.beginPath();
            context.arc(0, 0, r, 0, MATH_2PI, false);
            context.closePath();
            context.fill();
            context.restore();
        };

        /**
         * Draw line.
         * @param fromX {integer} Start x coordinate (px)
         * @param fromY {integer} Start y coordinate (px)
         * @param toX {integer} End x coordinate (px)
         * @param toY {integer} End y coordinate (px)
         * @param lineWidth {integer} Line width
         * @param style {String} stroke style
         */
        that.drawLine = function(formX, formY, toX, toY, lineWidth, style) {
            context.save();
            context.lineWidth = lineWidth;
            context.strokeStyle = style;
            context.moveTo(fromX, fromY);
            context.lineTo(toX, toY);
            context.stroke();
            context.restore();
        };

        return that;
    };

    return drawContext;
});