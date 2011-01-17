<%@page pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@taglib prefix="f" uri="http://www.slim3.org/functions"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
	<meta name="format-detection" content="telephone=no"/>
	<title>${f:h(spellCard.name)} - DANMAKU.jp</title>
	<link rel="apple-touch-icon" type="image/png" href="/images/home_icon.png">
	<link rel="mixi-check-image" type="image/jpeg" href="http://www.danmaku.jp/images/noimage.jpg" />
	<link href='http://fonts.googleapis.com/css?family=Orbitron:regular,bold' rel='stylesheet' type='text/css'>
	<link href="/css/common.css" rel="stylesheet" type="text/css"/>
    <link href="/css/loginBox.css" rel="stylesheet" type="text/css"/>
	<link href="/css/watch.css" rel="stylesheet" type="text/css" />
	<script src="/js/lib/jquery/jquery-1.4.4.js"></script>
    <script src="/js/lib/jquery/jquery.tmpl-1.0.0pre.js"></script>
	<script src="/js/lib/codemirror/codemirror.js"></script>
	<script data-main="spell/watch" src="/js/require.js"></script>
</head>
<body>
	<header>
		<a href="/">
			<img class="logo" src="/images/bullet_bill.png" alt="Logo"/>
			<h1><span class="impact">DAN</span>MAKU<span class="version">BETA</span></h1>
		</a>
	</header>
	<nav id="topnavi"></nav>
	<section id="spellInfo">
		<h1>${f:h(spellCard.name)}</h1>
		<div>${f:br(f:nbsp(f:h(spellCard.description)))}</div>
	</section>
	<section id="likeBox"></section>
	<section id="watchBox">
		<div id="previewBox">
			<div id="iframeWrapper">
				<iframe src="/spell/view.html?spellCode=${spellCard.code}" width="320" height="440" border="0" frameborder="0" scrolling="no"></iframe>
			</div>
		</div>
		<div id="editorBox">
			<div id="codeBox">
				<textarea id="spellDefinition" style="display: none">${spellCard.definitionAsString}</textarea>
			</div>
		</div>
		<div style="clear:both"></div>
	</section>
    <footer>
    	<span>&copy;2011 hakobera</span>
    </footer>
</body>
</html>