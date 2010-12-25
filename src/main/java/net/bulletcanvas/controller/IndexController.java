package net.bulletcanvas.controller;

import org.slim3.controller.Navigation;

public class IndexController extends ControllerBase {

	@Override
	protected Navigation run() throws Exception {
		return forward("index.html");
	}

}
