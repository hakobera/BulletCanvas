/**
 * 描画用のコンテキストを管理するオブジェクトです。
 * Canvas の 2D コンテキストの処理を隠蔽します。
 */
define(function() {
// private properties
/**
 * HTML5 canvas
 * @private 
 */
var canvas;
	
/**
 * 2D context of HTML5 canvas
 * @private 
 */
var context;

// private methods
/**
 * Create and initialize DrawContext object.
 */
var init = function(canvas_) {
	canvas = canvas_;
	context = canvas.getContext('2d');
	
	return {
		/**
		 * Canvas の幅を返します。
		 */
		getWidth: function() {
			return canvas.width;
		},
		
		/**
		 * Canvas の高さを返します。
		 */
		getHeight: function() {
			return canvas.height;
		},
		
		/**
		 * Context を返します。
		 * どうしても直接コンテキストを操作したい場合にのみ利用します。
		 */
		getContext: function() {
			return context;
		}
	};
};
	
return {
	create: function(canvas_) {
		return init(canvas_);
	}
};

});