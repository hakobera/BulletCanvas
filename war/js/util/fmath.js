/**
 * scat.js
 * Sine, Cosine, Arctangent テーブル。
 */
define(function() {
	var SIN_FINENESS = 512;
	var SIN_FINENESS_SEXAGESIMAL = 60;
	var SIN_MASK = 0x1ff;
	var ATAN_SHIFT = 7;
	var ATAN_TABLE_SIZE = SIN_FINENESS / 4 + 1 | 0;

	var sintable = [];
	var costable = [];
	var atantable = [];

	var i;
	for (i = 0; i < SIN_FINENESS; ++i) {
		sintable[i] = Math.sin(Math.PI / SIN_FINENESS * 2.0 * i);
	}

	for (i = 0; i < SIN_FINENESS_SEXAGESIMAL; ++i) {
		costable[i] = Math.cos(Math.PI / SIN_FINENESS_SEXAGESIMAL * 2.0 * i);
	}

	for (i = 0; i < ATAN_TABLE_SIZE; ++i) {
		atantable[i] = Math.atan(i / (ATAN_TABLE_SIZE - 1)) * (SIN_FINENESS / 8) / (Math.PI / 4.0);
	}

	return {
	  /**
		 * @param {integer}
		 *          theta 512分度
		 */
	  sin : function(theta) {
		  theta &= SIN_MASK;
		  return sintable[theta];
	  },

	  /**
		 * @param {integer}
		 *          theta 60分度
		 */
	  cos : function(theta) {
		  theta %= SIN_FINENESS_SEXAGESIMAL;
		  return costable[theta];
	  },

	  /**
		 * @param {integer}
		 *          x
		 * @param {integer}
		 *          y
		 */
	  atan : function(x, y) {
		  if (x == 0 && y == 0) {
			  return SIN_FINENESS / 2;
		  }

		  // 45°区切りで座標がどの領域かを判定
		  if (x >= 0) {// xが正
			  if (y >= 0) {// 第一象限
				  if (x > y) {
					  return atantable[(y << ATAN_SHIFT) / x | 0];
				  } else {
					  return SIN_FINENESS / 4 - atantable[(x << ATAN_SHIFT) / y | 0];
				  }
			  } else { // 第四象限
				  if (x > -y) {
					  return SIN_FINENESS - atantable[((-y) << ATAN_SHIFT) / x | 0];
				  } else {
					  return SIN_FINENESS * 3 / 4 + atantable[(x << ATAN_SHIFT) / (-y) | 0];
				  }
			  }
		  } else {// xが負
			  if (y >= 0) {// 第二象限
				  if (-x > y) {
					  return SIN_FINENESS / 2 - atantable[(y << ATAN_SHIFT) / (-x) | 0];
				  } else {
					  return SIN_FINENESS / 4 + atantable[((-x) << ATAN_SHIFT) / y | 0];
				  }
			  } else { // 第三象限
				  if (-x > -y) {
					  return SIN_FINENESS / 2 + atantable[((-y) << ATAN_SHIFT) / (-x) | 0];
				  } else {
					  return SIN_FINENESS * 3 / 4 - atantable[((-x) << ATAN_SHIFT) / (-y) | 0];
				  }
			  }
		  }
	  }
	};
});