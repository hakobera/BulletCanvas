define(
['danmaku/BulletMLParser'],
function(parser) {
	module('BulletMLParser');
		
	test('test001.xml', function() {
		stop();
		$.ajax({
			url: '/bulletml/test001.xml',
			cache: false,
			success: function(data) {
				start();
				console.log(data);
				parser.parse(data);
				
				var actions = parser.getActions();
				same(actions.length, 2);
				same(actions[0].label, 'top');
				same(actions[1].label, 'top2');

				same(parser.getFires().length, 1);
			}
		});
	});
	
	test('test002.xml', function() {
		stop();
		$.ajax({
			url: '/bulletml/test002.xml',
			cache: false,
			success: function(data) {
				start();
				console.log(data);
				parser.parse(data);
				
				var actions = parser.getActions();
				same(actions.length, 1);
				same(actions[0].label, 'top');

				var bullets = parser.getBullets();
				console.log(bullets);
				same(bullets.length, 3);

				same(parser.getFires().length, 0);
			}
		});
	});

});