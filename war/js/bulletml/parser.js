/**
 * parser.js - Module for parsing BulletML.
 */
define([
  'bulletml/parseHelper',
  'bulletml/task/taskFactory',
  'util/messageFormat',
  'lib/debug'
],
function(parseHelper, taskFactory, fmt, debug) {

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
        context.actions = [];

        /**
         * Mapping information of top action label to action instance.
         * @private 
         */
        context.labelToAction = {};

        /**
         * Top bullet list.
         * @private
         */
        context.bullets = [];

        /**
         * Mapping information of top bullet label to action instance.
         * @private
         */
        context.labelToBullet = {};

        /**
         * Top fire list.
         * @private
         */
        context.fires = [];

        /**
         * Mapping information of top fire label to action instance.
         * @private
         */
        context.labelToFire = {};
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
                context.labelToAction[action.label] = action;
                context.actions.push(action);
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
                context.labelToBullet[bullet.label] = bullet;
                context.bullets.push(bullet);
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
                context.labelToFire[fire.label] = fire;
                context.fires.push(fire);
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
            return that;
        };

        return that;
    };
    
    return parser;
});
