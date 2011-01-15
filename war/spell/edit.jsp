<%@page pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="f" uri="http://www.slim3.org/functions"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>DANMAKU Edit</title>
	<link href="/css/reset.css" rel="stylesheet" type="text/css" />
	<link href="/css/editor.css" rel="stylesheet" type="text/css" />
	<script src="/js/lib/jquery/jquery-1.4.4.js"></script>
	<script src="/js/lib/codemirror/codemirror.js"></script>
	<script data-main="spell/edit" src="/js/require.js"></script>
</head>
<body>
<div id="editorBox">
	<div id="codeBox">
		<textarea id="spellDefinition">${spellCard.definitionAsString}</textarea>
	</div>
</div>
<div id="previewBox">
	<div id="controllerBox">
		<button id="reloadScript">Save &amp; Reload</button>
		<a href="/watch/${spellCard.code}">Watch Page</a>
	</div>
	<div id="iframeWrapper"></div>
</div>
<div style="clear:both"></div>
</body>
</html>