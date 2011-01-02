require(['util/analogpad'], function() {
    require.ready(function() {
        var analogpad = $('#analogpad').analogpad();
        setInterval(function() {
            $('#x').text(analogpad.getX());
            $('#y').text(analogpad.getY());
        }, 100);
    });
});
