define(
['danmaku/DrawContext'],
function(drawContext) {
	module('DrawContext');

	var canvas = document.createElement('canvas');
	canvas.width = 300;
	canvas.height = 200;	
	var context = drawContext.create(canvas);
	
	test('Canvas の幅が取得できることを確認', function() {
		same(context.getWidth(), 300, 'getWidth() === 300');
	});

	test('Canvas の高さが取得できることを確認', function() {
		same(context.getHeight(), 200, 'getHeight() === 200');
	});

	test('Canvas のコンテキストが取得できることを確認', function() {
		same(context.getContext(), canvas.getContext('2d'), 'getContext() === canvas.getContext("2d")');
	});
}
);

