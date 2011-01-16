require(['common/layout', 'util/url', 'text!../../template/spellcard.html'],
	function(layout, url, spellcard) {
		require.ready(function() {
			var showSpellCard = function(url, target) {
	            $.ajax({
	                url: url,
	                cache: false,
	                success: function(data) {
	                    $.tmpl(spellcard, data).appendTo(target);
	                    $('article', target).css('display', 'inline-block');
	                }
	            });        
			};
			
			var pathParam = url.pathParam(window.location.href);
			layout.init();			
			showSpellCard('/api/account/' + pathParam + '/spellCards', $('#accountSpells'));
		});
	}
);