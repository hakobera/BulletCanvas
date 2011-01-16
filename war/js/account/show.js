require(['common/layout', 'util/url', 'text!../../template/myspellcard.html'],
	function(layout, url, spellcard) {
		require.ready(function() {
			var pathParam = url.pathParam(window.location.href);
			layout.init();			
			layout.showSpellCard('/api/account/' + pathParam + '/spellCards', spellcard, $('#accountSpells'), false);
		});
	}
);