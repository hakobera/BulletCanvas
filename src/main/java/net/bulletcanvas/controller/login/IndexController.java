package net.bulletcanvas.controller.login;

import net.bulletcanvas.controller.SessionKey;

import org.slim3.controller.Navigation;

/**
 * ログイン画面へ遷移させるコントローラです。
 */
public class IndexController extends LoginControllerBase {

	private static final String PARAM_REDIRECT = "redirect";
	
	/**
	 * ログイン画面に遷移させます。
	 */
	@Override
	public Navigation run() throws Exception {
		String redirectUrl = param(PARAM_REDIRECT);
		sessionScope(SessionKey.REDIRECT, redirectUrl);
		return forward("index.jsp");
	}

}
