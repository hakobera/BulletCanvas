require(['common/layout', 'text!../template/spellcard.html'],
	function(layout, spellcard) {
		require.ready(function() {
			layout.init();			
			layout.showSpellCard('/api/spellcard/newDevelopped', spellcard, $('#newDevelopped'), true);
			layout.showSpellCard('/api/spellcard/newDevelopped', spellcard, $('#hot'), true);
        });
	}
);