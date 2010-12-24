define(
['danmaku/bulletml/BulletMLParser'],
function(parser) {
	module('BulletMLParser');
	
	stop();
	
	test('test001.xml', function() {
		$.ajax({
			url: '/bulletml/test001.xml',
			cache: false,
			success: function(data) {
				start();
				parser.parse(data);
				
				//same(parser.getActions().length, 1);
			}
		});
	});
	
});