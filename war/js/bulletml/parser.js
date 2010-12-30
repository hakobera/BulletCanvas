/**
 * parser.js - Module for parsing BulletML.
 */
define([
  'bulletml/parseHelper',
  'bulletml/task/taskFactory',
  'lib/debug'
],
function(parseHelper, taskFactory, debug) {

    /**
     * @constructor
     */
    var parser = function() {
        var that = {};
        var context = {};

        /**
         * Top action list.
         * @private
         */
        var actions = [];

        /**
         * Mapping information of top action label to action instance.
         * @private 
         */
        var labelToAction = {};

        /**
         * Top bullet list.
         * @private
         */
        var bullets = [];

        /**
         * Mapping information of top bullet label to action instance.
         * @private
         */
        var labelToBullet = {};

        /**
         * Top fire list.
         * @private
         */
        var fires = [];

        /**
         * Mapping information of top fire label to action instance.
         * @private
         */
        var labelToFire = {};
8
        /**
         * Parse top action elements.
         * @private
         */
        var parseTopActions = function(root) {
            var topActions = parseHelper.getChildElementsByTagName(root, 'action');
            for (var i = 0; i < topActions.length; ++i) {
                var action = parseHelper.parseActionDef(topActions[i]);
                debug(action);
                labelToAction[action.label] = action;
                actions.push(action);
            }
        };

        /**
         * Parse top bullet elements.
         * @private
         */
        var parseTopBullets = function(root) {
            var topBullets = parseHelper.getChildElementsByTagName(root, 'bullet');
            var len = topBullets.length;
            for (var i = 0; i < len; ++i) {
                var bullet = parseHelper.parseBulletDef(topBullets[i]);
                debug(bullet);
                labelToBullet[bullet.label] = bullet;
                bullets.push(bullet);
            }
        };

        /**
         * Parse top fire elements.
         * @private
         */
        var parseTopFires = function(root) {
            var topFires = parseHelper.getChildElementsByTagName(root, 'fire');
            var len = topFires.length;
            for (var i = 0; i < len; ++i) {
                var fire = parseHelper.parseFireDef(topFires[i]);
                debug(fire);
                labelToFire[fire.label] = fire;
                fires.push(fire);
            }
        };
        
        /**
         * Parse BulletML.
         * 
         * @private
         * @param root {XMLObject} Root element of BulletML.
         */
        var parse = function(root) {
            parseTopActions(root);
            parseTopFires(root);
            parseTopBullets(root);
        };

        /**
         * Parse BulletML.
         *
         * @public
         * @param bulletML {XMLObject} BulletML
         * @return (this) Parser
         */
        that.parse = function(bulletML) {
            var root = bulletML.getElementsByTagName('bulletml')[0];
            parse(root);

            return {
                getActions: function() {
                    return actions;   
                },

                getAction: function(label) {
                    return labelToAction[label];
                },

                getBullet: function(label) {
                    return labelToBullet[label];
                },

                getFire: function(label) {
                    return labelToFire[label];
                }
            };
        };

        return that;
    };
    
    return parser;
});
