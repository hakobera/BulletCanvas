package net.bulletcanvas.controller.login.twitter;

import net.bulletcanvas.auth.AuthType;
import net.bulletcanvas.controller.SessionKey;
import net.bulletcanvas.controller.login.LoginControllerBase;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.service.AccountService;

import org.slim3.controller.Navigation;
import org.slim3.datastore.EntityNotFoundRuntimeException;

import twitter4j.ProfileImage;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.http.RequestToken;

/**
 * Twitter からのログインコールバック。
 */
public class CallbackController extends LoginControllerBase {

	@Override
	public Navigation run() throws Exception {
		try {
			validate();
		} catch (TwitterException e) {
			errors.put("Twitter", e.getMessage());
			return forward("error.jsp"); // エラー画面へフォワード
		}
		return redirect("/"); // 次画面へリダイレクト
	}
	
	private void validate() throws TwitterException {
		Twitter twitter           = removeSessionScope(SessionKey.TWITTER);
		RequestToken requestToken = removeSessionScope(SessionKey.REQUEST_TOKEN);
		String verifier           = asString("oauth_verifier");

		twitter.getOAuthAccessToken(requestToken, verifier);
		
		String accountId = AuthType.Twitter.createUniqueAccountId(Long.toString(twitter.getId()));
		String screenName = twitter.getScreenName();
		ProfileImage profileImage = twitter.getProfileImage(screenName, ProfileImage.NORMAL);
		String profileImageUrl = profileImage.getURL();
		
		Account account = AccountService.auth(accountId, screenName, profileImageUrl);
		
		login(account);
	}

}
