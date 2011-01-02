/**
 * testRunner.js - Module for running qunit test for RequireJS module.
 */
define(function() {
    return {
        run: function(baseDir, scripts) {
            for (var i = 0; i < scripts.length; ++i) {
                scripts[i] = baseDir + scripts[i];
            }
            require(scripts);
        }
    };
});