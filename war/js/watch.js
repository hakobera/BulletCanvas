require(['common/layout'],
	function(layout) {
		require.ready(function() {
			layout.init();
			
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