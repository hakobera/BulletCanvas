package net.bulletcanvas.controller.login.twitter;

import net.bulletcanvas.controller.login.LoginControllerBase;

import org.slim3.controller.Navigation;

import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.http.RequestToken;

/**
 * Twitter で認証をおこなうコントローラです。
 */
public class AuthController extends LoginControllerBase {

	/** twitter アプリ鍵 */
	public static final String CONSUMER_KEY = "l9HVJJJ0DxgqTbcw0xFRQ";

	/** twitter アプリ秘密鍵 */
	public static final String CONSUMER_SECRET = "JXQ1ifZCobFhx0IgzpFNLeu7adNdtZ8Lj9sbcqfQO8";

	/** twitter 認証時の一時オブジェクト */
	public static final String SESSION_TWITTER = "twitter";

	/** twitter 認証時のリクエストトークン */
	public static final String SESSION_REQUEST_TOKEN = "requestToken";

	/**
	 * Twitter の認証画面に遷移させます。
	 */
	@Override
	public Navigation run() throws Exception {
		return redirect(getAuthenticationURL());
	}

	private String getAuthenticationURL() throws TwitterException {
		Twitter twitter = new TwitterFactory().getOAuthAuthorizedInstance(CONSUMER_KEY, CONSUMER_SECRET);
		RequestToken requestToken = twitter.getOAuthRequestToken(createCallbackUrl());

		sessionScope(SESSION_TWITTER, twitter);
		sessionScope(SESSION_REQUEST_TOKEN, requestToken);

		return requestToken.getAuthenticationURL();
	}

}
