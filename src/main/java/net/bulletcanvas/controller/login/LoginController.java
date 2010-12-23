package net.bulletcanvas.controller.login;

import javax.servlet.http.Cookie;

import net.bulletcanvas.controller.login.twitter.Const;

import org.slim3.controller.Controller;


public abstract class LoginController extends Controller {
	
	protected void login(String accountId) {
		Cookie cookie = new Cookie(Const.ACCOUNT, accountId);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
	
}
