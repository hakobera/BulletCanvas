var testBase = '../jstest/util/';
function run(scriptName) {
	return testBase + scriptName;
};

require(
    [
        run('test-format')
    ]
);