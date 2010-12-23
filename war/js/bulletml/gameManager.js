define(['bulletml/screen', 'bulletml/bullet', 'bulletml/action', 'bulletml/frag', 'util/random', 'util/log'],
function(screen, Bullet, Action, Frag, random, log) {
	var FPS = 30;
	var FRAME_INTERVAL = 1000 / FPS;
	
	var BULLET_MAX = 256;
	var bullets = [];
	var bulletIndex = 0;
	
	var ACTION_MAX = 1024;
	var actions = [];
	var actionIndex = 0;
	
	var FRAG_MAX = 16;
	var frags = [];
	var fragIndex = 0;

	var topActions = [];
	var topBullet;
	var shotCount = 0;
	
	var bulletDefs = {};
	var actionDefs = {};
	var fireDefs = {};
	
	var prevTick = 0;	
	var fpsTime = 0;
	var fpsFrameCount = 0;
	var fps = document.getElementById('fps');

	var timer;

	var showFps = function(rate) {
		fps.innerText = rate;
	};
	
	var updateFps = function(frameInterval) {
		fpsTime += frameInterval;
		++fpsFrameCount;
		if (fpsTime >= 1000) {
			var f = fpsTime / fpsFrameCount;
			showFps(f | 0);
			fpsTime -= 1000;
			fpsFrameCount = 0;
		}
	};

	var getAvalableBullet = function() {
		for (var i = BULLET_MAX-1; i >= 0; --i) {
			bulletIndex = (++bulletIndex >= BULLET_MAX ? 0 : bulletIndex);
			var bullet = bullets[bulletIndex];
			if (!bullet.live) {
				bullet.live = true;
				return bullet;
			}
		}
		return null; // empty bullet not found.
	};
	
	var getAvailableAction = function() {
		for (var i = ACTION_MAX-1; i >= 0; --i) {
			actionIndex = (++actionIndex >= ACTION_MAX ? 0 : actionIndex);
			var action = actions[actionIndex];
			if (!action.live) {
				action.live = true;
				return action;
			}
		}
		return null; // empty bullet not found.
	};
	
	var getActionDef = function(def) {
		var label = def.getAttribute('label');
		return actionDefs[label];
	};
	
	var getBulletDef = function(def) {
		
	};

	var addBullets = function() {
		if (topBullet != null &&
				topBullet.live &&
				!topBullet.isAllActionFinished()) {
			return;
		}
		
		--shotCount;
		if (shotCount > 0) {
			return;
		}
		
		shortCount = 60;
		topBullet = getAvalableBullet();
		if (topBullet == null) {
			return;
		}
		
		topBullet.init(120 + random.next(80), 20 + random.next(40), random.next(3));
		for (var i = 0; i < topActions.length; ++i) {
			var action = getAvailableAction();
			if (action == null) {
				break;
			}
			action.setActionDef(getActionDef(topActions[i]), topBullet);
			topBullet.addAction(action);
		}
	};
	
	var moveBullets = function() {
		for (i = 0; i < BULLET_MAX; ++i) {
			if (bullets[i].live) {
				bullets[i].move();
			}
		}	
	};
	
	var moveFrags = function() {
		for (i = 0; i < FRAG_MAX; ++i) {
			if (frags[i].live) {
				frags[i].move();
			}
		}
	};
	
	var drawBullets = function(context) {
		for (i = 0; i < BULLET_MAX; ++i) {
			if (bullets[i].live) {
				context.save();
				bullets[i].draw(context);
				context.restore();
			}
		}	
	};
	
	var drawFrags = function(context) {
		for (i = 0; i < FRAG_MAX; ++i) {
			if (frags[i].live) {
				context.save();
				frags[i].draw(context);
				context.restore();
			}
		}
	};

	var addFrag = function(x, y) {
		fragIndex = (++fragIndex >= BULLET_MAX ? 0 : fragIndex);
		frags[fragIndex].set(x, y);
	};
	
	var mainLoop = function() {
		var currentTick = new Date().getTime();
		var frameInterval =  currentTick - prevTick;
		prevTick = currentTick;

		screen.clear();
		updateFps(frameInterval);
		addBullets();
		moveBullets();
		moveFrags();
		
		var context = screen.getContext();
		drawBullets(context);
		drawFrags(context);
	};

	return {
		loadConfig: function(config) {
			log.debug('load start');
			var doms = $(xmlString);
			bulletML = null;
			for (var i = 0; i < doms.length; ++i) {
				if (doms[i].getAttribute) {
					bulletML = $(doms[i]);
					break;
				}
			}
			
			topActions = bulletML.children('action');
			topActions.each(function() {
				var self = $(this);
				var label = self.attr('label');
				log.debug('load actionDef', label);
				actionDefs[label] = self;
			});
			
			bulletML.children('bullet').each(function() {
				var self = $(this);
				var label = self.attr('label');
				log.debug('load bulletDef', label);
				bulletDefs[label] = self;
			});
			
			bulletML.children('fire').each(function() {
				var self = $(this);
				var label = self.attr('label');
				log.debug('load fireDef', label);
				fireDefs[label] = self;
			});
		},

		createBullet: function() {
			return getAvalableBullet();
		},
		
		init: function() {
			var i;
			for (i = 0; i < BULLET_MAX; ++i) {
				bullets[i] = Bullet.create(this);
			}	

			for (i = 0; i < ACTION_MAX; ++i) {
				actions[i] = Action.create(this);
			}	

			for (i = 0; i < FRAG_MAX; ++i) {
				frags[i] = Frag.create(this);
			}
			
			prevTick = new Date().getTime();
		},
		
		run: function() {
			timer = setInterval(mainLoop, FRAME_INTERVAL);
		},
		
		stop: function() {
			clearInterval(timer);
		}
	};
});