<%@page pageEncoding="UTF-8" trimDirectiveWhitespaces="true" session="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="f" uri="http://www.slim3.org/functions"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Edit DANMAKU - Bullet Canvas</title>
	<link href="/css/editor.css" rel="stylesheet" type="text/css" />
	<script src="/js/lib/codemirror/codemirror.js"></script>
</head>
<body>
<div id="editorBox">
	<div id="codeBox">
		<textarea id="code">${spellCard.definition}</textarea>
	</div>
</div>
<div id="previewBox">
	<canvas width="400" height="400"></canvas>
</div>
<div style="clear:both"></div>
<script type="text/javascript"> 
  var editor = CodeMirror.fromTextArea('code', {
    height: "100%",
    width: '95%',
    parserfile: "parsexml.js",
    stylesheet: "/css/xmlcolors.css",
    path: "/js/lib/codemirror/",
    continuousScanning: 500,
    lineNumbers: true
  });
</script>
</body>
</html>