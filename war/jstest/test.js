var testBase = '../jstest/test/';
function use(scriptName) {
	return testBase + scriptName;
};

require([
	use('test-DrawContext'),
	use('test-DanmakuObject'),
	use('test-Expression'),
	use('test-BulletMLParser'),
	use('test-messageFormat'),
	use('test-scat')
]);