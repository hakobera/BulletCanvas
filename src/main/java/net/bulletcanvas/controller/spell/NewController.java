package net.bulletcanvas.controller.spell;

import net.bulletcanvas.controller.ControllerBase;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.service.SpellCardService;

import org.slim3.controller.Navigation;

public class NewController extends ControllerBase {

	@Override
	public Navigation run() throws Exception {
		if (!isLogin()) {
			return redirectToLoginUrl();
		}

		Account account = getLoginAccount();
		SpellCard spellCard = SpellCardService.newAndPut(account);
		
		String template = loadFromLoacalFile("/bulletml/template.xml");
		spellCard.setDefinition(template);
		SpellCardService.put(account, spellCard);
		
		return redirect(String.format("/%s/%s/edit", account.getScreenName(), spellCard.getCode()));
	}

}
