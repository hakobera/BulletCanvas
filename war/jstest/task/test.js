var testBase = '../jstest/task/';
function run(scriptName) {
	return testBase + scriptName;
};

require(
    [
        run('test-task'),
        run('test-taskManager')
    ]
);