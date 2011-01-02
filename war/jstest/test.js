require(['../jstest/testRunner'], function(testRunner) {
    testRunner.run('../jstest/',
    [
        'bullet/test',
        'bulletml/test',
        'task/test',
        'util/test'
    ]);
});