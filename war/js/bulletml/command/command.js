/**
 * command.js - Interface of command.
 */
define(function() {
    var command = function(spec) {
        var that = {};

        /**
         * Parameter for expression vairables.
         * @private
         * @type Array
         */
        var parameters = spec.parameters || [];

        /**
         * Execute command.
         * 
         * @param {Object} task Call task
         * @param {Object} actionCommand Call action command
         * @param {Object} updateContext
         * @return {boolean} true if you want to execute next commands, false if you do not want to execute next commands.
         */
        that.execute = function(task, actionCommand, updateContext) {
            return true;
        };

        /**
         * Reset command.
         */
        that.reset = function() {
        };


        /**
         * Return replacement parameters.
         * @public
         */
        that.getParameters = function() {
            return parameters;
        };

        /**
         * Set replacement parameters.
         * @public
         */
        that.setParameters = function(p) {
            parameters = p;
        };

        return that;
    };
    
    return command;
});