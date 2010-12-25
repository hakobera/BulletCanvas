package net.bulletcanvas.controller.login.twitter;

import net.bulletcanvas.controller.SessionKey;
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

	private static final String CONSUMER_KEY = "l9HVJJJ0DxgqTbcw0xFRQ";
	private static final String CONSUMER_SECRET = "JXQ1ifZCobFhx0IgzpFNLeu7adNdtZ8Lj9sbcqfQO8";

	/**
	 * Twitter の認証画面に遷移させます。
	 */
	@Override
	public Navigation run() throws Exception {
		return redirect(getAuthenticationURL());
	}

	private String getAuthenticationURL() throws TwitterException {
		Twitter twitter = new TwitterFactory().getOAuthAuthorizedInstance(
				CONSUMER_KEY, CONSUMER_SECRET);
		RequestToken requestToken = twitter.getOAuthRequestToken(createCallbackUrl());

		sessionScope(SessionKey.TWITTER, twitter);
		sessionScope(SessionKey.REQUEST_TOKEN, requestToken);

		return requestToken.getAuthenticationURL();
	}

}
