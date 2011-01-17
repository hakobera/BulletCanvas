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
		<a href="#" id="reloadScript">Save &amp; Reload</a>
		<a href="/watch/${spellCard.code}">Finish Edit</a>
	</div>
	<ul id="spellInfoBox">
        <li>
            <a id="spellInfoEdit" href="#spellInfoEdit"><span id="spellName">${spellCard.name}</span> ▼</a>
            <section id="spellInfoForm">
                <dl>
                    <dt>弾幕名</dt>
                    <dd><input type="text" name="name" id="name" value="${spellCard.name}" maxlength="200"/></dd>

                    <dt>コメント</dt>
                    <dd><textarea name="description" id="description">${spellCard.description}</textarea></dd>
                    
                    <dt>サムネイル</dt>
                    <dd id="thumbnail"><img src="/images/noimage.jpg"/></dd>
                </dl>
                <button id="updateSpellInfo">Update</button>
            </section>
        </li>
    </ul>
	<div id="iframeWrapper"></div>
</div>
<div style="clear:both"></div>
</body>
</html>