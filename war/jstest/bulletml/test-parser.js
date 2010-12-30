define(
[
    'bulletml/parser',
    'lib/debug'
],
function(parser, debug) {
    module('parser');

    test('template.xml', function() {
        stop();
  		$.ajax({
			url: '/bulletml/template.xml',
			cache: false,
			success: function(data) {
				start();
				debug(data);

                var doc = parser().parse(data);

                var actions = doc.getActions();
                same(actions.length, 1, 'action.length === 1');

                var topAction = doc.getAction('top'); 
                same(topAction.label, 'top', 'topAction.label === "top"');

                var commands = topAction.commands;
                same(commands.length, 1, 'topAction.commands.length === 1');

                var fire = commands[0];
                same(commands.toString(), '<FireDef label=, direction=<Direction type=aim, value=1>, speed=<Speed type=absolute, value=1>>');
            }
		});
    });

    test('top action, fire, bullet 1つずつ', function() {
        stop();
  		$.ajax({
			url: '/bulletml/test001.xml',
			cache: false,
			success: function(data) {
				start();
				debug(data);

                var doc = parser().parse(data);

                var actions = doc.getActions();
                same(actions.length, 1, 'action.length === 1');

                var action1 = doc.getAction('action1');
                same(action1.label, 'action1', 'action1.label === "action1"');
                same(action1.toString(), '<ActionDef label=action1, commands=[<FireRef label=fire1, params=[]>,<Vanish>]>');

                var bullet1 = doc.getBullet('bullet1');
                same(bullet1.label, 'bullet1');
                same(bullet1.toString(), '<BulletDef label=bullet1, direction=<Direction type=aim, value=1>, speed=<Speed type=absolute, value=1>, actions=[<ActionDef label=, commands=[<Wait value=20+$rand*50>,<ChangeDirection direction=<Direction type=absolute, value=180>, term=<Term value=10>>]>]>');

                var fire1 = doc.getFire('fire1');
                same(fire1.label, 'fire1');
                same(fire1.toString(), '<FireDef label=fire1, direction=<Direction type=absolute, value=2>, speed=<Speed type=sequence, value=3>>');
            }
		});
    });

    test('action に全ての子要素を付与したパターン', function() {
        stop();
  		$.ajax({
			url: '/bulletml/test002.xml',
			cache: false,
			success: function(data) {
				start();
				debug(data);

                var doc = parser().parse(data);

                var actions = doc.getActions();
                same(actions.length, 2, 'action.length === 2');

                var action1 = doc.getAction('action1');
                debug(action1);
                same(action1.label, 'action1', 'action1.label === "action1"');
                same(action1.toString(), '<ActionDef label=action1, commands=[<[Repeat times=<Times value=2>, action=<ActionRef label=action2, params=[<Param value=1>]>>,<Wait value=10>,<FireDef label=, direction=<Direction type=absolute, value=20>, speed=<Speed type=relative, value=10>>,<FireDef label=, direction=<Direction type=aim, value=1>, speed=<Speed type=absolute, value=1>>,<FireRef label=fire1, params=[]>,<Vanish>,<ChangeDirection direction=<Direction type=aim, value=20+$rand>, term=<Term value=1>>,<ChangeSpeed speed=<Speed type=absolute, value=10>, term=<Term value=5>>,<Vanish>]>');
             }
		});
    });
});