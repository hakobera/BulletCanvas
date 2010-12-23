package net.bulletcanvas.controller.login.twitter;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

import twitter4j.*;
import twitter4j.http.*;

public class AuthController extends Controller {

	private static final String CONSUMER_KEY = "l9HVJJJ0DxgqTbcw0xFRQ";
	private static final String CONSUMER_SECRET = "JXQ1ifZCobFhx0IgzpFNLeu7adNdtZ8Lj9sbcqfQO8";

	@Override
	public Navigation run() throws Exception {
		return redirect(getAuthenticationURL());
	}

	private String getAuthenticationURL() throws TwitterException {
		Twitter twitter = new TwitterFactory().getOAuthAuthorizedInstance(
				CONSUMER_KEY, CONSUMER_SECRET);
		sessionScope(Const.TWITTER, twitter);

		RequestToken requestToken = twitter.getOAuthRequestToken(callbackUrl());
		sessionScope(Const.REQUEST_TOKEN, requestToken);

		return requestToken.getAuthorizationURL();
	}

	private String callbackUrl() {
		StringBuffer url = request.getRequestURL();
		int n = url.indexOf(basePath);
		n += basePath.length();
		url.setLength(n);
		url.append("callback");
		return url.toString();
	}

}
