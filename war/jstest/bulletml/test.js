var testBase = '../jstest/bulletml/';
function run(scriptName) {
	return testBase + scriptName;
};

require(
    [
        run('task/test-taskFactory'),
        run('task/test-actionTask'),
        run('test-parser')
    ]
);