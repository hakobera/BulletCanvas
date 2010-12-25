package net.bulletcanvas.controller.spell;

import net.bulletcanvas.controller.ControllerBase;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.service.SpellCardService;

import org.slim3.controller.Navigation;

public class EditController extends ControllerBase {

	private static final String PARAM_ACCOUNT_ID = "accountId";
	private static final String PARAM_SPELL_CODE = "spellCode";

	private static final String ATTR_SPELL_CARD = "spellCard";

	@Override
	public Navigation run() throws Exception {
		String accountId = asString(PARAM_ACCOUNT_ID);
		String spellCode = asString(PARAM_SPELL_CODE);

		if (!isLogin()) {
			return redirectToLoginUrl(String.format("/%s/%s/edit", accountId, spellCode));
		}

		Account account = getLoginAccount();
		SpellCard spellCard = SpellCardService.find(account, spellCode);

		requestScope(ATTR_SPELL_CARD, spellCard);
		return forward("edit.jsp");
	}
}
