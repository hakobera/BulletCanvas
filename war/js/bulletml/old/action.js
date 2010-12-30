define(['util/log'], function(log) {
	
  var ABSOLUTE_KEYWORD = "absolute";
  var RELATIVE_KEYWORD = "relative";
  var SEQUENCE_KEYWORD = "sequence";
  var AIM_KEYWORD = "aim";
	
	var index = 0;
	
	/**
	 * @constructor
	 */
	var Action = function(taskManager) {
		this.id = ++index;
		this.live = false;
		this.taskManager = taskManager;
	};
	
	/**
	 * @param {object} actionDef
	 * @param {object} bullet
	 */
	Action.prototype.setActionDef = function(actionDef, bullet) {
		this.live = true;
		this.repeat = 1;
		this.pc = -1;
		this.waitCount = this.moveSpeedCount = this.moveDirectionCount = this.accelerationCount = 0;
		this.prevFireDirection = 0;
		this.prevFireSpeed = 1;
		this.parent = null;
		this.params = null;
		
		this.actions = actionDef.children();
		this.bullet = bullet;
	};
	
	/**
	 * @param {integer} moveDirectionCount
	 * @param {float} moveDirection
	 * @param {boolean} isAim
	 * @param {integer} moveSpeedCount
	 * @param {float} moveSpeed
	 * @param {integer} accelerationCount
	 * @param {float} moveMx
	 * @param {float} moveMy
	 */
	Action.prototype.setMoveStatus = function(moveDirectionCount, moveDirection, isAim,
																						moveSpeedCount, moveSpeed, accelerationCount,
																						moveMx, moveMy) {
		this.moveDirectionCount = moveDirectionCount;
		this.moveDirection = moveDirection;
		this.isAim = isAim;
		this.moveSpeedCount = moveSpeedCount;
		this.moveSpeed = moveSpeed;
		this.accelerationCount = accelerationCount;
		this.moveMx = moveMx;
		this.moveMy = moveMy;
	};
	
	/**
	 * @param {float} prevFireDirection
	 * @param {float} prevFireSpeed
	 */
	Action.prototype.setFireStatus = function(prevFireDirection, prevFireSpeed) {
		this.prevFireDirection = prevFireDirection;
		this.prevFireSpeed = prevFireSpeed;
	};
	
	/**
	 * Disable this action.
	 */
	Action.prototype.vanish = function() {
		if (parent != null) {
			parent.vanish();
		}
		this.live = false;
	};

    Action.prototype.move = function() {
		if (this.moveSpeedCount > 0) {
			--this.moveSpeedCount;
			this.bullet.speed += this.moveSpeed;
		}
		
		if (this.moveDirectionCount > 0) {
			--this.moveDirectionCount;
			if (this.moveDirectionCount == 0) {
				if (this.isAim) {
					this.bullet.direction += this.bullet.getAimDeg();
				}
			} else {
				this.bullet.direction += this.moveDirection();
			}
		}
		
		if (this.accelerationCount > 0) {
			--this.accelerationCount;
			this.bullet.mx += moveMx;
			this.bullet.my += moveMy;
		}
		
		if (!this.live) {
			return;
		}
		
		if (this.waitCount > 0) {
			--this.waitCount;
			return;
		}
		
		while (true) {
			++this.pc;
			if (this.pc >= this.actions.length) {
				--this.repeat;
				if (this.repeat <= 0) {
					this.live = false;
					if (this.parent != null) {
						this.parent.setMoveStatus(
								this.moveDirectionCount, this.moveDirection, this.isAim,
								this.moveSpeedCount, this.moveSpeed, this.accelerationCount,
								this.moveMx, this.moveMy);
						this.parent.setPrevFireStatus(this.prevFireStatus, this.prevFireSpeed);
						this.bullet.changeAction(this, this.parent);
					}
					break;
				} else {
					this.pc = 0;
				}
			}
			
			var act = this.actions[this.pc];
			var type = act.tagName;
			if (type === 'REPEAT') {
				
			} else if (type === 'ACTION') {
				
			} else if (type === 'FIRE') {
				var b = this.taskManager.createBullet();
				if (b != null) {
					var bdef = act.getElementsByTagName('bullet');
					if (bdef.length === 0) {
						var bref = act..getElementsByTagName('bulletRef');
						bdef = taskManager.getBulletDef(bref[0].getAttribute('label'));
					}
					b.setBulletDef(bdef, this.bullet.x, this.bullet.y, this.bullet.colorIndex);
				}
			} else if (type === 'CHANGESPEED') {
				
			} else if (type === 'CHANGEDIRECTION') {
				
			} else if (type === 'ACCEL') {
				
			} else if (type === 'WAIT') {

			} else if (type === 'VANISH') {
				this.bullet.vanish();
				break;
			}
	}
		
		
	};
	
	return {
		create: function(taskManager) {
			var instance = new Action(taskManager);
			log.debug('create action', instance.id);
			return instance;
		}
	};
	
});