package net.bulletcanvas.auth;

public interface Auth {

	/**
	 * 認証クッキー名
	 */
	String AUTH_COOKIE_NAME = "session";

	/**
	 * 認証クッキーの最終アクセスからの有効期限。 現時点では1週間とする。
	 */
	int AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

	/**
	 * アカウント情報をリクエストに格納する名前
	 */
	String REQUEST_ACCOUNT = "requestAccount";

}
