require(['util/url'],
	function(url) {
        var spellCode = url.pathParam(window.location.href);
	 	var createIframe = function() {
	 		var iframe = '<iframe src="/spell/view.html?spellCode=' + spellCode + '" width="320" height="440" border="0" frameborder="0" scrolling="no"></iframe>'
	 		$('#iframeWrapper').html(iframe);
		};
	
		require.ready(function() {
			createIframe();
			
			var editor = CodeMirror.fromTextArea('spellDefinition', {
			    height: "100%",
			    width: '95%',
			    parserfile: "parsexml.js",
			    stylesheet: "/css/xmlcolors.css",
			    path: "/js/lib/codemirror/",
			    continuousScanning: 500,
			    lineNumbers: true
			});
				    
			$('#reloadScript').click(function() {
                $.ajax({
                    url: '/api/spellDefinition/' + spellCode,
                    type: 'POST',
                    data: { spellDefinition: editor.getCode() },
                    success: function() {
                        createIframe();
                    },
                    error: function() {
                        alert('Reload failed');
                    }
                });
            });
		});
	}
);