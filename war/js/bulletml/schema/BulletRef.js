/**
 * Refers to the bullet.
 * ラベル付けされたbullet要素を参照します。 
 * この要素は同名のラベルでラベル付けされたbullet要素と同じに扱われます。
 * 参照されたbullet要素内の変数（$1, $2, $3, ...）は、 
 * <param>要素に指定された数値に置き換えられます。
 *  （最初に出現したparam要素が$1に、次に出現したparam要素が$2に、...）
 */
define(['util/format', 'bulletml/schema/BulletDef'], function(format, BulletDef) {
	var bulletRef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.params = spec.params;

        that.bulletType = function() {
            return 'bulletRef';
        };

        /**
         * Clone this object.
         * @return {Object} Deep copy of this object.
         */
        that.clone = function() {
            function f() {};
            f.prototype = that;
            var other = new f();
            other.label = that.label;
            other.params = [];
            for (var i = 0; i < that.params.length; ++i) {
                other.params[i] = that.params[i].clone();
            }
            return other;
        };

        that.toString = function() {
            return format('<BulletRef label=%1, params=%2>', that.label, that.params);
        };

        return that;
    };

    return bulletRef;
});