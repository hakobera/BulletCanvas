define(
['danmaku/DanmakuObject'],
function(danmakuObject) {
	module('DanmakuObject');
	
	test('初期値の確認', function() {
		var obj = danmakuObject.create();
		same(obj.x, 0, 'x === 0');
		same(obj.y, 0, 'y === 0');
		same(obj.parent, undefined, 'parent === undefined');
	});
	
	test('文字列表示の確認', function() {
		var obj = danmakuObject.create();
		same('DanmakuObject[x=0, y=0]', obj.toString());
	});

}
);

