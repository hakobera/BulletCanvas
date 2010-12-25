package net.bulletcanvas.controller.login;

import javax.servlet.http.Cookie;

import net.bulletcanvas.auth.Auth;
import net.bulletcanvas.controller.ControllerBase;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.service.AccountService;

import org.slim3.datastore.Datastore;
import org.slim3.datastore.EntityNotFoundRuntimeException;

/**
 * Login　コントローラの共通メソッドをまとめたクラスです。 ログインに関連するコントローラはこのクラスを継承して作成します。
 */
public abstract class LoginControllerBase extends ControllerBase {

	protected void login(Account account) {
		Cookie cookie = new Cookie(Auth.AUTH_COOKIE_NAME, Datastore.keyToString(account.getKey()));
		cookie.setPath("/");
		cookie.setMaxAge(Auth.AUTH_COOKIE_MAX_AGE);
		response.addCookie(cookie);
		sessionScope(SESSION_ACCOUNT, account);
	}

	protected void logout() {
		removeSessionScope(SESSION_ACCOUNT);
		Cookie cookie = new Cookie(Auth.AUTH_COOKIE_NAME, "");
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}

	protected boolean autoLogin() {
		Cookie authCookie = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (Auth.AUTH_COOKIE_NAME.equals(cookie.getName())) {
					authCookie = cookie;
					break;
				}
			}
		}

		if (authCookie != null) {
			// TODO: 書き換えられていないかチェック
			String accountKey = authCookie.getValue();
			try {
				Account account = AccountService.findByAccountId(accountKey);
				login(account);
				return true;
			} catch (EntityNotFoundRuntimeException e) {
				// ignore
			}
		}

		return false;
	}

	protected String createCallbackUrl() {
		StringBuffer url = request.getRequestURL();
		int n = url.indexOf(basePath);
		n += basePath.length();
		url.setLength(n);
		url.append("callback");
		return url.toString();
	}

}
