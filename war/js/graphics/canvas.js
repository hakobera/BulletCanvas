/**
 * canvas.js - Class module for managing HTML5 Canvas element.
 */
define(function() {

    /**
     * Create canvas management class instance.
     *
     * @constructor 
     * @param width {integer} width(px) of canvas.
     * @param height {integer} height(px) of canvas.
     */
    var canvas = function(width, height) {
        var that = {};
        var canvasElement = document.createElement('canvas');
        canvasElement.width = width | 0;
        canvasElement.height = height | 0;

        /**
         * Return managed canvas element.
         */
        that.canvas = function() {
            return canvasElement;
        };
        
        /**
         * Return 2d context of managed canvas element.
         */
        that.context = function() {
            return canvasElement.getContext('2d');
        };

        /**
         * Bind a managed canvas to a specified HTML document node.
         *
         * @param node {HTMLDocumentNode} HTML document node for binding managed canvas.
         */
        that.bind = function(node) {
            node.appendChild(canvasElement);
        };
        
        return that;
    };
    
    return canvas;
});