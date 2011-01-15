package net.bulletcanvas.controller.api;

import net.arnx.jsonic.JSON;
import net.bulletcanvas.controller.Parameter;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.service.SpellCardService;

/**
 * Spell Entity に対応する REST API です。
 * 
 * <dl>
 * 	 <dt>URL</dt>
 *   <dd>http://www.danmaku.jp/api/spell/{spellCode}</dd>
 *   
 *   <dt>Allowed Method</dt>
 *   <dd>GET</dd>
 * </dl>
 */
public class SpellController extends ApiControllerBase {

	@Override
	protected void get() throws Exception {
		String spellCode = asString(Parameter.SPELL_CODE);
		SpellCard spellCard = SpellCardService.findBySpellCode(spellCode);
		
		//String json = SpellCardMeta.get().modelToJson(spellCard, 1);
		// TODO: modelToJson が改行をエスケープできない問題の修正待ち
		String json = JSON.encode(spellCard);
		returnAsJson(json, spellCard.getUpdatedAt());
	}

}
