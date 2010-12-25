package net.bulletcanvas.controller;

import org.slim3.controller.router.RouterImpl;

public class AppRouter extends RouterImpl {

	public AppRouter() {
		addRouting("/{accountId}/{spellCode}/edit", "/spell/edit?accountId={accountId}&spellCode={spellCode}");
	}

}
