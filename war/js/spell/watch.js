require(['common/layout', 'util/url', 'text!../../template/like.html'],
	function(layout, url, like) {
		require.ready(function() {
			layout.init();

            var spellCode = url.pathParam(window.location.href);

            $.tmpl(like, { url: 'watch%2f' + spellCode }).appendTo($('#likeBox'));

			
			CodeMirror.fromTextArea('spellDefinition', {
			  height: "100%",
			  width: '95%',
			  parserfile: "parsexml.js",
			  stylesheet: "/css/watch.xmlcolors.css",
			  path: "/js/lib/codemirror/",
			  continuousScanning: 500,
			  lineNumbers: true,
			  readOnly: true
			});
		});
	}
);