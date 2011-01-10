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
        var topActions = [];

        /**
         * Mapping information of top action label to action instance.
         * @private 
         */
        var labelToAction = {};

        /**
         * Mapping information of top bullet label to action instance.
         * @private
         */
        var labelToBullet = {};

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
            var actions = parseHelper.getChildElementsByTagName(root, 'action');
            for (var i = 0; i < actions.length; ++i) {
                var action = parseHelper.parseActionDef(actions[i]);
                debug(action);

                if (action.label) {
                    labelToAction[action.label] = action;
                    if (action.label === 'top') { // top action の仕様については要検討
                        topActions.push(action);
                    }
                }
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
                if (bullet.label) {
                    labelToBullet[bullet.label] = bullet;
                }
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

                if (fire.label) {
                    labelToFire[fire.label] = fire;
                }
            }
        };
        
        /**
         * Parse BulletML.
         * 
         * @private
         * @param {Element} root Root element of BulletML.
         */
        var parse = function(root) {
            parseTopActions(root);
            parseTopFires(root);
            parseTopBullets(root);
        };


        /**
         * Find labeled object from hash and return clone of it.
         * If object not exists in hash, then return undefined.
         *
         * @private
         * @param {Object} hash Search target
         * @param {Object} label Search label
         * @return 
         */
        var clone = function(hash, label) {
            var obj = hash[label];
            return obj ? obj.clone() : undefined; // TODO: 例外を投げたほうが良い？
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
                getType: function() {
                    return root.attributes.type ? root.attributes.type.value : 'vertical';    
                },

                getTopActions: function() {
                    return topActions; 
                },

                getTopAction: function() {
                    return topActions[0]; 
                },

                getAction: function(label) {
                    return clone(labelToAction, label);
                },

                getBullet: function(label) {
                    return clone(labelToBullet, label);
                },

                getFire: function(label) {
                    return clone(labelToFire, label);
                }
            };
        };

        return that;
    };
    
    return parser;
});
