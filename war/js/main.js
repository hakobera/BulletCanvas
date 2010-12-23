require(['bulletml/gameManager', 'util/log'],
	function(taskManager, log) {
		require.ready(function() {
			taskManage.init();
			taskManager.loadConfig();
			gameManager.run();
			/*
			var editor = CodeMirror.fromTextArea('code', {
		    height: "350px",
		    parserfile: "parsexml.js",
		    stylesheet: "css/xmlcolors.css",
		    path: "js/lib/codemirror/",
		    continuousScanning: 1000,
		    lineNumbers: false
		  });
			*/
		});
	}
);
