<%@page pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="f" uri="http://www.slim3.org/functions"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>DANMAKU Edit</title>
	<link href="/css/editor.css" rel="stylesheet" type="text/css" />
	<script src="/js/lib/jquery/jquery-1.4.4.js"></script>
	<script src="/js/lib/codemirror/codemirror.js"></script>
</head>
<body>
<div id="editorBox">
	<div id="codeBox">
		<textarea id="spellDefinition">${spellCard.definitionAsString}</textarea>
	</div>
</div>
<div id="previewBox">
	<div>
		<button id="reloadScript">Reload</button>
	</div>
	<div id="iframeWrapper"></div>
</div>
<div style="clear:both"></div>
<script type="text/javascript"> 
  function createIframe() {
    var iframe = '<iframe src="/preview.html?spellCode=${spellCard.code}" width="320" height="480" border="0" scrolling="no"></iframe>'
    $('#iframeWrapper').html(iframe);
  }
  
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
		  url: '/api/spellDefinition/${spellCard.code}',
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
</script>
</body>
</html>