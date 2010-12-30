/**
 * Refers to the bullet.
 * ラベル付けされたbullet要素を参照します。 
 * この要素は同名のラベルでラベル付けされたbullet要素と同じに扱われます。
 * 参照されたbullet要素内の変数（$1, $2, $3, ...）は、 
 * <param>要素に指定された数値に置き換えられます。
 *  （最初に出現したparam要素が$1に、次に出現したparam要素が$2に、...）
 */
define(['util/messageFormat'], function(fmt) {
	var bulletRef = function(spec) {
        var that = {};
        that.label = spec.label;
        that.params = spce.params;

        that.toString = function() {
            return fmt.format('[BulletRef] bulletDef=%1, params=%2', this.bulletDef, this.params);
        };

        return that;
    };

    return bulletRef;
});