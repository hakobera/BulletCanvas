var testBase = '../jstest/test/';
function run(scriptName) {
	return testBase + scriptName;
};

require([
	run('test-DrawContext'),
	run('test-DanmakuObject'),
	run('test-Expression'),
	run('test-BulletMLParser'),
	run('test-messageFormat'),
	run('test-scat')
        //   run('test-taskSystem')  
]);