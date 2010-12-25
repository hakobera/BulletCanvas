package net.bulletcanvas.controller;

import net.bulletcanvas.model.Account;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

public abstract class ControllerBase extends Controller {

	/**
	 * ログイン後のリダイレクトパラメータ名
	 */
	public static final String PARAM_REDIRECT = "redirect";

	/**
	 * アカウント情報を格納するセッションキー
	 */
	public static final String SESSION_ACCOUNT = "ACCOUNT";

	protected boolean isLogin() {
		return sessionScope(SESSION_ACCOUNT) != null;
	}

	protected Account getLoginAccount() {
		return sessionScope(SESSION_ACCOUNT);
	}

	protected Navigation redirectToLoginUrl() {
		return redirect(String.format("/login/?%s=%s", PARAM_REDIRECT, basePath));
	}

	protected Navigation redirectToLoginUrl(String redirectPath) {
		return redirect(String.format("/login/?%s=%s", PARAM_REDIRECT, redirectPath));
	}
	
}
