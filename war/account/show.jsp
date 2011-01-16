<%@page pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="f" uri="http://www.slim3.org/functions"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
	<meta name="format-detection" content="telephone=no"/>
	<title>${f:h(account.screenName)} - DANMAKU.jp</title>
	<link rel="apple-touch-icon" type="image/png" href="/images/home_icon.png">
	<link href='http://fonts.googleapis.com/css?family=Orbitron:regular,bold' rel='stylesheet' type='text/css'>
	<link href="/css/common.css" rel="stylesheet" type="text/css"/>
    <link href="/css/loginBox.css" rel="stylesheet" type="text/css"/>
	<link href="/css/spellcard.css" rel="stylesheet" type="text/css" />
	<link href="/css/account.css" rel="stylesheet" type="text/css" />
	<script src="/js/lib/jquery/jquery-1.4.4.js"></script>
    <script src="/js/lib/jquery/jquery.tmpl-1.0.0pre.js"></script>
	<script src="/js/lib/codemirror/codemirror.js"></script>
	<script data-main="account/show" src="/js/require.js"></script>
</head>
<body>
	<header>
		<a href="/">
			<img class="logo" src="/images/bullet_bill.png" alt="Logo"/>
			<h1><span class="impact">DAN</span>MAKU<span class="version">BETA</span></h1>
		</a>
	</header>
	<nav id="topnavi"></nav>
	<h2>術者情報</h2>
	<section id="accountInfo">
		<div>
			<c:choose>
			<c:when test="${empty account.screenImageUrl}"><img src="/images/noimage.jpg"/></c:when>
			<c:otherwise><img src="${account.screenImageUrl}"/></c:otherwise>
			</c:choose>	
		</div>
		<table>
			<tr>
				<td class="label">術者名</td>
				<td class="value">${f:h(account.screenName)}</td>
			</tr>
		</table>
	</section>
	<div style="clear: both; height: 10px;"/>
	<h2>保有スペル</h2>
	<section id="accountSpells"></section>
	<footer>
		<span>&copy;2011 hakobera</span>
	</footer>
</body>
</html>
