package net.bulletcanvas.controller;

/**
 * セッションにデータを格納する際のセッションキーをまとめて定義するためのインターフェースです。
 */
public interface SessionKey {
	String ACCOUNT = "account";
	
	String REDIRECT = "redirect";

	String TWITTER = "twitter";
	String REQUEST_TOKEN = "requestToken";
}
