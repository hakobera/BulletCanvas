package net.bulletcanvas.controller.spell;

import net.bulletcanvas.controller.ControllerBase;
import net.bulletcanvas.controller.Parameter;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.service.SpellCardService;

import org.slim3.controller.Navigation;

/**
 * 弾幕定義編集コントローラです。
 */
public class EditController extends ControllerBase {

	private static final String ATTR_SPELL_CARD = "spellCard";

	@Override
	public Navigation run() throws Exception {
		String spellCode = asString(Parameter.SPELL_CODE);

		if (!isLogin()) {
			return redirectToLoginUrl(path("/spell/edit/%s", spellCode));
		}

		Account account = getLoginAccount();
		SpellCard spellCard = SpellCardService.find(account, spellCode);

		requestScope(ATTR_SPELL_CARD, spellCard);

		return forward("edit.jsp");
	}

}
