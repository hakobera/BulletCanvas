define([
	'danmaku/bulletml/Direction',
	'danmaku/bulletml/Speed'
],
function(Direction, Speed) {
	var FireDef = function(params) {
		this.direction = params.direction;
		this.speed = params.speed;
		
		console.log(this);
	};
	
	return {
		create: function(fire) {
			var direction;
			var directionDef = fire.getElementsByTagName('direction');
			if (directionDef.length === 1) {
				direction = Direction.create(directionDef[0]);
			}

			var speed;
			var speedDef = fire.getElementsByTagName('speed');
			if (speedDef.length === 1) {
				speed = Speed.create(speedDef[0])
			}
			
			return new FireDef({
				direction: direction,
				speed: speed
			});
		}
	};
});