package net.bulletcanvas.controller;

import net.bulletcanvas.controller.login.LoginControllerBase;

import org.slim3.controller.Navigation;


public class LogoutController extends LoginControllerBase {

    @Override
    public Navigation run() throws Exception {
    	logout();
    	return redirect("/");
    }
    
}
