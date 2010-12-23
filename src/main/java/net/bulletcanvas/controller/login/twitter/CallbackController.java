package net.bulletcanvas.controller.login.twitter;

import net.bulletcanvas.controller.login.LoginController;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.model.AccountType;
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
public class CallbackController extends LoginController {

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
		Twitter twitter           = sessionScope(Const.TWITTER);
		RequestToken requestToken = sessionScope(Const.REQUEST_TOKEN);
		String verifier           = asString("oauth_verifier");

		removeSessionScope(Const.REQUEST_TOKEN);
		removeSessionScope(Const.TWITTER);

		twitter.getOAuthAccessToken(requestToken, verifier);
		
		String accountId = AccountType.Twitter.createUniqueAccountId(Long.toString(twitter.getId()));
		Account account = null;
		try {
			account = AccountService.findByAccountId(accountId);
		} catch (EntityNotFoundRuntimeException e) {
			account = new Account();

			String screenName = twitter.getScreenName();
			account.setScreenName(screenName);
			
			ProfileImage profileImage = twitter.getProfileImage(screenName, ProfileImage.NORMAL);
			account.setScreenImageUrl(profileImage.getURL());

			ProfileImage miniProfileImage = twitter.getProfileImage(screenName, ProfileImage.MINI);
			account.setScreenMiniImageUrl(miniProfileImage.getURL());

			AccountService.put(accountId, account);
		}
		
		login(accountId);
	}

}
