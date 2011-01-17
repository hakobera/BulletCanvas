require(['util/url'],
	function(url) {
        var spellCode = url.pathParam(window.location.href);
	 	var createIframe = function() {
	 		var iframe = '<iframe src="/spell/view.html?edit=true&spellCode=' + spellCode + '&_=' + new Date().getTime() + '" width="320" height="440" border="0" frameborder="0" scrolling="no"></iframe>'
	 		$('#iframeWrapper').html(iframe);
		};
	
		require.ready(function() {
			createIframe();

            $('#spellInfoEdit').click(function(event) {
	            event.preventDefault();
	            $('#spellInfoForm').toggle('fast');
	        });

            var ua = window.navigator.userAgent;
			var editor = null;

            if (ua.indexOf('iPad') !== -1) {
                editor = {
                    getCode: function() {
                        return $('#spellDefinition').val();
                    }
                };
            } else {
                editor = CodeMirror.fromTextArea('spellDefinition', {
                    height: "100%",
                    width: '95%',
                    parserfile: "parsexml.js",
                    stylesheet: "/css/xmlcolors.css",
                    path: "/js/lib/codemirror/",
                    continuousScanning: 500,
                    lineNumbers: true
                });
            }

			$('#reloadScript').click(function(event) {
                event.preventDefault();
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

            $('#updateSpellInfo').click(function() {
                event.preventDefault();
                $.ajax({
                    url: '/api/spell/' + spellCode,
                    type: 'POST',
                    data: { spellName: $('#name').val(), spellDescription: $('#description').val() },
                    success: function() {
                        $('#spellName').html($('#name').val());
                    },
                    error: function() {
                        alert('Update failed');
                    }
                });
            });

            // iframe から呼び出せるように意図的にグローバル空間にエクスポート
            updateThumbnail = function() {
                $.ajax({
                    url: '/api/spellThumbnail/' + spellCode,
                    type: 'GET',
                    success: function(data) {
                        var html = '<img src="' + data + '" width="175" height="175"/>';
                        $('#thumbnail').html(html);
                    }
                });
            };
            updateThumbnail();
		});
	}
);