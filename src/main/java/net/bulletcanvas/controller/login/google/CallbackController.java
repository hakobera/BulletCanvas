package net.bulletcanvas.controller.login.google;

import net.bulletcanvas.auth.AuthType;
import net.bulletcanvas.controller.login.LoginControllerBase;
import net.bulletcanvas.exception.AuthException;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.service.AccountService;

import org.slim3.controller.Navigation;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

/**
 * Twitter からのログインコールバック。
 */
public class CallbackController extends LoginControllerBase {

	@Override
	public Navigation run() throws Exception {
		try {
			validate();
		} catch (AuthException e) {
			errors.put("Google", e.getMessage());
			return forward("error.jsp"); // エラー画面へフォワード
		}
		return redirect("/"); // 次画面へリダイレクト
	}

	private void validate() throws AuthException {
		UserService userService = UserServiceFactory.getUserService();
		if (!userService.isUserLoggedIn()) {
			throw new AuthException("Login failed");
		}

		User user = userService.getCurrentUser();
		String accountId = AuthType.Google.createUniqueAccountId(user.getUserId());
		String screenName = user.getNickname();
		String profileImageUrl = null;

		Account account = AccountService.auth(accountId, screenName, profileImageUrl);

		login(account);
	}

}
