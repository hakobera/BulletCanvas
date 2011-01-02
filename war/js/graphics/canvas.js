/**
 * canvas.js - Class module for managing HTML5 Canvas element.
 */
define(['lib/uuid'], function(uuid) {

    /**
     * Create canvas management class instance.
     *
     * @constructor 
     * @param width {integer} width(px) of canvas.
     * @param height {integer} height(px) of canvas.
     */
    var canvas = function(width, height) {
        var that = {};
        var frontCanvas = document.createElement('canvas');
        var backCanvas = document.createElement('canvas');
        var front = frontCanvas.getContext('2d');
        var back = backCanvas.getContext('2d');

        var w = width | 0;
        var h = height | 0;
        frontCanvas.width = backCanvas.width = w;
        frontCanvas.height = backCanvas.height = h;

        frontCanvas.setAttribute('id', uuid.generate());

        /**
         * Flip buffer.
         */
        that.flip = function() {
            var backImageData = back.getImageData(0, 0, w, h);
            front.putImageData(backImageData, 0, 0);
            //front.drawImage(backCanvas, 0, 0);
        };

        /**
         * Flip buffer.
         */
        that.getContext = function() {
            return back;
        };

        /**
         * Bind a managed canvas to a specified HTML document node.
         *
         * @param node {HTMLDocumentNode} HTML document node for binding managed canvas.
         */
        that.bind = function(node) {
            node.innerHTML = '';
            node.appendChild(frontCanvas);
        };
        
        return that;
    };
    
    return canvas;
});