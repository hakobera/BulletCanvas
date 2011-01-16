require(['common/layout', 'text!../template/spellcard.html'],
	function(layout, spellcard) {
		require.ready(function() {
			var showSpellCard = function(url, target) {
	            $.ajax({
	                url: url,
	                cache: false,
	                success: function(data) {
	                    $.tmpl(spellcard, data).appendTo(target);
	                    $('article', target).each(function() {
	                        var deg = Math.random() * 15;
	                        deg = Math.random() > 0.5 ? deg : -deg;
	                        $(this).css({ 'display': 'inline-block', '-moz-transform': 'rotate(' + deg + 'deg)', '-webkit-transform': 'rotate(' + deg + 'deg)' })
	                    });
	                }
	            });        
			};
			
			layout.init();			
			showSpellCard('/api/spellcard/newDevelopped', $('#newDevelopped'));
			showSpellCard('/api/spellcard/newDevelopped', $('#hot'));
		});
	}
);