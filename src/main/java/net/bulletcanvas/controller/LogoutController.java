package net.bulletcanvas.controller;

import javax.servlet.http.Cookie;

import net.bulletcanvas.controller.login.twitter.Const;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;


public class LogoutController extends Controller {

    @Override
    public Navigation run() throws Exception {
    	Cookie cookie = new Cookie(Const.ACCOUNT, "");
    	cookie.setMaxAge(0);
    	response.addCookie(cookie);
    	return redirect("/");
    }
    
}
