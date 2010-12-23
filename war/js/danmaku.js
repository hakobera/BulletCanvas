/**
 * namespace for the danmaku library.
 */
var danmaku = danmaku || {};

/**
 * @define {boolean} DEBUG is provided as a convenience so that debugging code.
 */
danmaku.DEBUG = true;

/**
 * Object used danmaku system configuration.
 * @type {Object}
 * @private
 */
danmaku.config_ = {};

/**
 * Default frames per second. * 
 * @const
 * @type {number}
 */
danmaku.FPS = 30;

/**
 * Main screen.
 * @type {Object}
 */
danmaku.mainScreen = null;

/**
 * 2-D Context of Main screen.
 * @type {Object}
 */
danmaku.mainScreenContext = null;

/**
 * Implements a system for the DANMAKU simulation.
 * @return {void} Nothing.
 */
danmaku.init = function(config) {
	for (key in config) {
		danmaku.config_[key] = config[key];
	}
	
	danmaku.mainScreen = document.getElementById(danmaku.config_['screen']);
	danmaku.mainScreenContext = danmaku.mainScreen.getContext('2d');
	danmaku.mainScreen.width = danmaku.config_['width'];
	danmaku.mainScreen.height = danmaku.config_['height'];
};

/**
 * Move all objects.
 * @return {void} Nothing.
 */
danmaku.move = function() {
}

/**
 * Render all objects.
 * @return {void} Nothing.
 */
danmaku.render = function() {
	var c = danmaku.mainScreenContext;
	c.fillStyle = "#eee";
	c.fillRect(0, 0, danmaku.mainScreen.width, danmaku.mainScreen.height);
}

/**
 * Main loop of the DANMAKU simulation.
 * @return {void} Nothing.
 */
danmaku.mainLoop = function(config) {
	var frameCount = 0;
	var updateInterval = 1000 / this.FPS;
	var previousTime = new Date().getTime();
	var process = function() {
		danmaku.move();
		danmaku.render();

		var currentTime = new Date().getTime();
		var interval = previousTime - currentTime;
		previous = currentTime;
		setTimeout(process, updateInterval);
	};
	process(this);
};

/**
 * Run a system for the DANMAKU simulation.
 * @return {void} Nothing.
 */
danmaku.run = function(config) {
	this.init(config);
	this.mainLoop(config);
};

