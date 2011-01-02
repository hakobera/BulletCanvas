require(['../jstest/testRunner'], function(testRunner) {
    testRunner.run('../jstest/bulletml/',
    [
        'task/test-taskFactory',
        'task/test-actionTask',
        'test-parser',
        'test-expression'
    ]);
});