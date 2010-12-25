package net.bulletcanvas.controller.login.google;

import net.bulletcanvas.controller.login.LoginControllerBase;

import org.slim3.controller.Navigation;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class AuthController extends LoginControllerBase {

	@Override
	public Navigation run() throws Exception {
		UserService userService = UserServiceFactory.getUserService();
		String loginUrl = userService.createLoginURL(createCallbackUrl());
		return redirect(loginUrl);
	}

}
