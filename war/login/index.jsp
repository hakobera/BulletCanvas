<%@page pageEncoding="utf-8" contentType="text/html;charset=utf-8" trimDirectiveWhitespaces="true" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
	<meta name="format-detection" content="telephone=no"/>
	<title>Bullet Canvas - Share your DANMAKU!!</title>
	<link rel="apple-touch-icon" type="image/png" href="/images/home_icon.png">
	<link href='http://fonts.googleapis.com/css?family=Orbitron:regular,bold' rel='stylesheet' type='text/css'>
	<link href="/css/common.css" rel="stylesheet" type="text/css"/>
	<link href="/css/login.css" rel="stylesheet" type="text/css"/>
</head>
<body>
	<header>
		<a href="/">
			<img class="logo" src="/images/bullet_bill.png" alt="Logo"/>
			<h1><span class="impact">B</span>ullet <span class="impact">C</span>anvas<span class="version">BETA</span></h1>
		</a>
	</header>
	<section id="loginServiceBox">
		<h2>Login</h2>
		<ul>
			<li>
				<a href="/login/twitter/auth">
					<img alt="Twitter" src="/images/login/twitter.png"/>
					<span>Twitter ID でログイン</span>
				</a>
			</li>
			<li>
				<a href="/login/google/auth">
					<img alt="Google" src="/images/login/google.png"/>
					<span>Google アカウントでログイン</span>
				</a>
			</li>
		</ul>
	</section>
</body>
</html>