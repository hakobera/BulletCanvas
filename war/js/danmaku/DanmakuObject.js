define([
	'util/messageFormat'
],
function(fmt) {

/**
 * @costructor
 */
DanmakuObject = function() {
	this.x = 0;
	this.y = 0;
};

var p = DanmakuObject.prototype;

/**
 * フレーム更新時に呼び出される処理です。
 */
p.update = function() {};

/**
 * 描画時に呼び出される処理です。
 * 描画処理はフレームの処理時間によってはスキップされることがあるので、
 * 毎フレーム呼び出されることを想定した処理は記述しないでください。
 */
p.draw = function(drawContext) {};

/**
 * 文字列出力。
 */
p.toString = function() {
	return fmt.format('DanmakuObject[x=%1, y=%2]', this.x, this.y);
};

return {
	/**
	 * Factory method of DanmakuObject.
	 *
	 * @return Instance of DanmakuObject
	 */
	create: function() {
		return new DanmakuObject();
	}
};
});