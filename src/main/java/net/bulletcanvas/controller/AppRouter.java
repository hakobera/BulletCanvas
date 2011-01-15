package net.bulletcanvas.controller;

import org.slim3.controller.router.RouterImpl;

public class AppRouter extends RouterImpl {

	public AppRouter() {
		// API
		addRouting("/api/spell/{spellCode}", "/api/spell?spellCode={spellCode}");
		addRouting("/api/spellDefinition/{spellCode}", "/api/spellDefinition?spellCode={spellCode}");
		
		// URL hack for controller
		addRouting("/spell/edit/{spellCode}", "/spell/edit?spellCode={spellCode}");
	}

}
