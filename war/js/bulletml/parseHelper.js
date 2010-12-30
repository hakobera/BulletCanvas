/**
 * schema.js - Helper module for parsing BulletML.
 */
define([
  'bulletml/schema/Accel',
  'bulletml/schema/ActionDef',
  'bulletml/schema/ActionRef',
  'bulletml/schema/BulletDef',
  'bulletml/schema/BulletRef',
  'bulletml/schema/ChangeDirection',
  'bulletml/schema/ChangeSpeed',
  'bulletml/schema/Direction',
  'bulletml/schema/FireDef',
  'bulletml/schema/FireRef',
  'bulletml/schema/Horizontal',
  'bulletml/schema/Param',
  'bulletml/schema/Repeat',
  'bulletml/schema/Speed',
  'bulletml/schema/Term',
  'bulletml/schema/Times',
  'bulletml/schema/Vanish',
  'bulletml/schema/Vertical',
  'bulletml/schema/Wait',
  'lib/debug'
],
function(
        accel,
        actionDef, actionRef,
        bulletDef, bulletRef,
        changeDirection, changeSpeed, direction,
        fireDef, fireRef,
        horizontal, param, repeat,
        speed, term, times,
        vanish, vertical, wait,
        debug) {

    var strip = function(text) {
        return text.replace(/^\s+/, '').replace(/\s+$/, '');
    };

    var number = function(text) {
        return parseFloat(strip(text));
    };

    var attr = function(node, attrName, defaultValue) {
        return node.attributes[attrName] ? node.attributes[attrName].value : defaultValue;
    };

    var defaultDirection = function() {
        return direction({});
    };

    var defaultSpeed = function() {
        return speed({});
    };

    return {
        getFirstChildElementByTagName: function(node, tagName) {
            var len = node.childNodes.length;
            for (var i = 0; i < len; i++) {
                var c = node.childNodes[i];
                    if (c.tagName === tagName) {
                        return c;
                    }
            }
            return null;
        },

        getChildElementsByTagName: function(node, tagName) {
            var children = [];
            var len = node.childNodes.length;
            for (var i = 0; i < len; i++) {
                var c = node.childNodes[i];
                    if (c.tagName === tagName) {
                        children.push(c);
                    }
            }
            return children;
        },
        
        parseAccel: function(node) {
            var horizontal;
            var horizontalNode = this.getFirstChildElementByTagName(node, 'horizontal');
            if (horizontalNode) {
                horizontal = this.parseHorizontal(horizontalNode);
            }

            var vertical;
            var verticalNode = this.getFirstChildElementByTagName(node, 'vertical');
            if (verticalNode) {
                vertical = this.parseVertical(verticalNode);
            }

            var term = null;
            var termNode = getFirstChildElementByTagName(node, 'term');
            if (termNode) {
                term = this.parseTerm(termNode);
            } else {
                throw new Error('[accel] <term> is required.');
            }

            return accel({
                horizontal: horizontal,
                vertical: vertical,
                term: term
            });
        },
        
        parseActionDef: function(node) {
            var label = attr(node, 'label', null);
            var commands = [];
            var childNodes = node.childNodes;
            var len = childNodes.length;
            var command;
            
            for (var i = 0; i < len; ++i) {
                var tag = childNodes[i];
                if (tag.nodeType === 1/*element*/) {
                    var tagName = tag.tagName;
                    switch (tagName) {
                    case 'repeat':
                        command = this.parseRepeat(tag);
                        break;

                    case 'fire':
                        command = this.parseFireDef(tag);
                        break;

                    case 'fireRef':
                        command = this.parseFireRef(tag);
                        break;

                    case 'changeSpeed':
                        command = this.parseChangeSpeed(tag);
                        break;

                    case 'changeDirection':
                        command = this.parseChangeDirection(tag);
                        break;

                    case 'accel':
                        command = this.parseAccel(tag);
                        break;

                    case 'wait':
                        command = this.parseWait(tag);
                        break;

                    case 'vanish':
                        command = this.parseVanish(tag);
                        break;

                    case 'action':
                        command = this.parseActionDef(tag);
                        break;

                    case 'actionRef':
                        command = this.parseActionRef(tag);
                        break;

                    default:
                        throw new Error(fmt.format('<%1> is invalid', tagName));
                    }

                    commands.push(command);
                }
            }

            return actionDef({
                label: label,
                commands: commands
            });
        },

        parseActionRef: function(node) {
            var label = attr(node, 'label', null);
            if (!label) {
                throw new Error('[actionRef] "label" attribute is required');
            }

            var params = [];
            var p;
            var childNodes = node.childNodes;
            var len = childNodes.length;

            for (var i = 0; i < len; ++i) {
                var tag = childNodes[i];
                if (tag.nodeType === 1/*element*/) {
                    var tagName = tag.tagName;
                    switch (tagName) {
                    case 'param':
                        p = this.parseParam(tag);
                        params.push(p);
                        break;
                    }
                }
            }

            return actionRef({
                label: label,
                params: params
            });
        },

        parseBulletDef: function(node) {
            var label = attr(node, 'label', null);
            var direction = defaultDirection();
            var speed = defaultSpeed();
            var actions = [];
            var childNodes = node.childNodes;
            var len = childNodes.length;
            var command;

            for (var i = 0; i < len; ++i) {
                var tag = childNodes[i];
                if (tag.nodeType === 1/*element*/) {
                    var tagName = tag.tagName;
                    switch (tagName) {
                    case 'speed':
                        speed = parseSpeed(tag);
                        break;

                    case 'direction':
                        direction = parseSpeed(tag);
                        break;

                    case 'action':
                        actions.push(parseActionDef(tag));
                        break;

                    case 'actionRef':
                        actions.push(parseActionRef(tag));
                        break;
                    }
                }
            }

            return bulletDef({
                label: label,
                direction: direction,
                speed: speed,
                actions: actions
            });
        },
        
        parseBulletRef: function(node) {
            var label = attr(node, 'label', null);
            if (!label) {
                throw new Error('[bulletRef] "label" attribute is required');
            }


            var params = [];
            var childNodes = node.childNodes;
            var len = childNodes.length;

            for (var i = 0; i < len; ++i) {
                var tag = childNodes[i];
                if (tag.nodeType === 1/*element*/) {
                    var tagName = tag.tagName;
                    switch (tagName) {
                    case 'param':
                        var p = this.paramParam(tag);
                        params.push(p);
                        break;
                    }
                }
            }

            return bulletRef({
                label: label,
                params: params
            });
        },

        parseDirection: function(node) {
            var direction = this.defalutDirection();
            var term;
            var childNodes = node.childNodes;
            var len = childNodes.length;

            for (var i = 0; i < len; ++i) {
                var tag = childNodes[i];
                if (tag.nodeType === 1/*element*/) {
                    var tagName = tag.tagName;
                    switch (tagName) {
                    case 'speed':
                        speed = this.parseSpeed(tag);
                        break;

                    case 'term':
                        term = this.parseTerm(tag);
                        break;
                    }
                }
            }

            if (!direction) {
                throw new Error('[changeDirection] <direction> is required.');
            }

            if (!term) {
                throw new Error('[changeDirection] <term> is required.');
            }

            return changeDirection({
                direction: direction,
                term: term
            });
        },

        parseChangeSpeed: function(node) {
            var speed = defaultSpeed();
            var term;
            var p;
            var childNodes = node.childNodes;
            var len = childNodes.length;

            for (var i = 0; i < len; ++i) {
                var tag = childNodes[i];
                if (tag.nodeType === 1/*element*/) {
                    var tagName = tag.tagName;
                    switch (tagName) {
                    case 'speed':
                        speed = this.parseSpeed(tag)
                        break;

                    case 'term':
                        term = this.parseTerm(tag);
                        break;
                    }
                }
            }

            if (!speed) {
                throw new Error('[changeSpeed] <speed> is required.');
            }

            if (!term) {
                throw new Error('[changeSpeed] <term> is required.');
            }

            return changeSpeed({
                speed: speed,
                term: term
            });
        },

        parseDirection: function(node) {
            var type = attr(node, 'type', 'aim');
            var value = number(node.textContent);
            return direction({
                type: type,
                value: value
            });
        },

        parseFireDef: function(node) {
            var label = attr(node, 'label', null);
            var direction = defaultDirection();
            var speed = defaultSpeed();

            var childNodes = node.childNodes;
            var len = childNodes.length;
            for (var i = 0; i < len; ++i) {
                var tag = childNodes[i];
                if (tag.nodeType === 1/*element*/) {
                    var tagName = tag.tagName;
                    switch (tagName) {
                    case 'direction':
                        direction = this.parseDirection(tag);
                        break;

                    case 'speed':
                        speed = this.parseSpeed(tag);
                        break;
                    }
                }
            }

            return fireDef({
                label: label,
                direction: direction,
                speed: speed
            });
        },
        
        parseFireRef: function(node) {
            var label = attr(node, 'label', null);
            if (!label) {
                throw new Error('[fireRef] "label" attribute is required');
            }

            var params = [];
            var p;

            var childNodes = node.childNodes;
            var len = childNodes.length;
            for (var i = 0; i < len; ++i) {
                var tag = childNodes[i];
                if (tag.nodeType === 1/*element*/) {
                    var tagName = tag.tagName;
                    switch (tagName) {
                    case 'param':
                        p = this.parseParam(paramNodes[i]);
                        params.push(p);
                        break;
                    }
                }
            }

            return fireRef({
                label: label,
                params: params
            });
        },
        
        parseHorizontal: function(node) {
            var type = attr(node, 'label', 'absolute');
            var value = number(node.textContent);
            return horizontal({
                type: type,
                value: value
            });
        },

        parseParam: function(node) {
            var value = number(node.textContent);
			return param(value);
        },
        
        parseRepeat: function(node) {
            var times;
            var action;
            var command;
            var childNodes = node.childNodes;
            var len = childNodes.length;

            for (var i = 0; i < len; ++i) {
                var tag = childNodes[i];
                if (tag.nodeType === 1/*element*/) {
                    var tagName = tag.tagName;
                    switch (tagName) {
                    case 'times':
                        times = this.parseTimes(tag);
                        break;

                    case 'action':
                        action = this.parseActionDef(tag);
                        break;

                    case 'actionRef':
                        action = this.parseActionRef(tag);
                        break;
                    }
                }
            }

            if (!times) {
                throw new Error('[repeat] <times> is required.');
            }

            if (!action) {
                throw new Error('[repeat] <action> or <actionRef> is required.');
            }

            return repeat({
                times: times,
                action: action
            });
        },

        parseSpeed: function(node) {
            var type = attr(node, 'type', 'absolute');
            var value = number(node.textContent);
            return speed({
                type: type,
                value: value
            });
        },

        parseTerm: function(node) {
            var value = number(node.textContent);
            return term({
                value: value
            });
        },

        parseTimes: function(node) {
            var value = number(node.textContent);
            return times({
                value: value
            });
        },

        parseVanish: function(node) {
            return vanish();
        },
        
        parseVertical: function(node) {
			var type = attr(node, 'type', 'absolute');
			var value = number(node.textContent);
			return vertical({
                type: type,
                value: value
            });
        },

        parseWait: function(node) {
            var value = number(node.textContent);
            return wait({
                value: value
            });
        }
    };
});
