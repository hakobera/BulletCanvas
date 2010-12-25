package net.bulletcanvas.controller.login;

import org.slim3.controller.Navigation;

/**
 * ログイン画面へ遷移させるコントローラです。
 */
public class IndexController extends LoginControllerBase {

	/**
	 * ログイン画面に遷移させます。
	 */
	@Override
	public Navigation run() throws Exception {
		logout();
		String redirectUrl = param(PARAM_REDIRECT);
		sessionScope(PARAM_REDIRECT, redirectUrl);
		return forward("index.jsp");
	}

}
