/**
 * jquery-analogpad-plugin - jQuery plugin for emulate analog pad controller.
 *
 * https://github.com/hakobera/jquery-analogpad-plugin
 * version: 0.1
 *
 * Copyright 2011, Kazuyuki Honda (@hakobera)
 * Licensed under the MIT licenses (MIT-LICENSE.txt). 
 */
jQuery.fn.extend({
    analogpad: function(args) {
        var clicked = false;
        var self = $(this);
        var x, y, sx, sy, cx, cy;

        self.addClass('analogpad')
        var base = $('<div>').addClass('analogpad-base').appendTo(self);
        var pad = $('<div>').addClass('analogpad-pad').appendTo(base);

        x =  cx = pad.css('left').replace("px", "") | 0;
        y =  cy = pad.css('top').replace("px", "") | 0;

        var onMoveStart = function() {
            clicked = true;
            var e = (event.touches ? event.touches[0] : event);
            sx = e.pageX | 0;
            sy = e.pageY | 0;
        };

        var onMoveEnd = function() {
            pad.css({ 'left': '', 'top': ''});
            clicked = false;
            x = cx;
            y = cy;
        };

        var onMove = function() {
            if (clicked) {
                event.preventDefault();
                var e = (event.touches ? event.touches[0] : event);
                var px = e.pageX | 0;
                var py =  e.pageY | 0;
                var left = pad.css('left').replace("px", "") | 0;
                var top = pad.css('top').replace("px", "") | 0;
                var dx = px - sx;
                var dy = py - sy;

                x = left + dx;
                y = top + dy;
                sx = px;
                sy = py;
                x = Math.max(0, Math.min(2*cx, x));
                y = Math.max(0, Math.min(2*cy, y));

                pad.css({ 'left': x + 'px', 'top': y + 'px'});
            }
        };

        pad.mousedown(onMoveStart);
        pad.bind('touchstart', onMoveStart);

        pad.mouseup(onMoveEnd);
        pad.mouseout(onMoveEnd);
        pad.bind('touchend', onMoveEnd);

        pad.mousemove(onMove);
        pad.bind('touchmove', onMove);

        var api = {
            /**
             * Return x axis value. Right direction is positive.
             * @return {float} value between -1.0 and 1.0.
             */
            getX: function() {
                return (x - cx) / cx;
            },

            /**
             * Return y axis value. Up direction is positive.
             * @return {float} Value between -1.0 and 1.0.
             */
            getY: function() {
                return (cy - y) / cy;
            },

            /**
             * Return x and y axis value.
             * @return {Object} key x: value between -1.0 and 1.0, key y: value between -1.0 and 1.0. 
             */
            input: function() {
                return {
                    x: api.getX(),
                    y: api.getY()
                };
            }
        };

        return api;
    }
});