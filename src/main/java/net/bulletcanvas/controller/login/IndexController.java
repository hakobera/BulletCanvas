package net.bulletcanvas.controller.login;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

/**
 * ログイン処理をおこなうコントローラです。
 */
public class IndexController extends Controller {

	/**
	 * ログインします。
	 */
    @Override
    public Navigation run() throws Exception {
        UserService userService = UserServiceFactory.getUserService();
       	return redirect(userService.createLoginURL(request.getRequestURI()));
    }
    
}
