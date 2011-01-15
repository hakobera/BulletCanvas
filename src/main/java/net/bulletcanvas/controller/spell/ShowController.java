package net.bulletcanvas.controller.spell;

import net.bulletcanvas.controller.ControllerBase;
import net.bulletcanvas.controller.Parameter;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.service.SpellCardService;

import org.slim3.controller.Navigation;

/**
 * 弾幕定義参照画面へ遷移させるコントローラです。
 */
public class ShowController extends ControllerBase {

	private static final String ATTR_SPELL_CARD = "spellCard";

	@Override
	public Navigation run() throws Exception {
		String spellCode = asString(Parameter.SPELL_CODE);
		SpellCard spellCard = SpellCardService.findBySpellCode(spellCode);
		requestScope(ATTR_SPELL_CARD, spellCard);
		return forward("show.jsp");
	}

}
