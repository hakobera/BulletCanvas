define(
[
    'bulletml/parser'
],
function(parser) {
    module('parser');

    test('template.xml', function() {
        stop();

  		$.ajax({
			url: '/bulletml/template.xml',
			cache: false,
			success: function(data) {
				start();
				console.log(data);
				parser().parse(data);
			}
		});
    });

});