package net.bulletcanvas.controller;

import net.bulletcanvas.model.Account;

import org.slim3.controller.Controller;

public abstract class ControllerBase extends Controller {
	
	protected Account getLoginAccount() {
		return sessionScope(SessionKey.ACCOUNT);
	}
	
}
