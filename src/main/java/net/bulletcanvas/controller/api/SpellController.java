package net.bulletcanvas.controller.api;

import javax.servlet.http.HttpServletResponse;

import com.google.appengine.repackaged.com.google.common.base.StringUtil;

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
	
	/**
	 * スペル名とコメントを更新します。
	 */
	@Override
	protected void post() throws Exception {
		// TODO: Login check
		String spellCode = asString(Parameter.SPELL_CODE);
		String spellName = asString(Parameter.SPELL_NAME);
		String spellDescription = asString(Parameter.SPELL_DESCRIPTION);
		
		// TODO: validation
		if (validate(spellCode, spellName, spellDescription)) {
			SpellCard spellCard = SpellCardService.findBySpellCode(spellCode);
			if (spellCard == null) {
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return;
			}
			spellCard.setName(spellName);
			spellCard.setDescription(spellDescription);
			SpellCardService.update(spellCard);			
		}
	}
	
	private boolean validate(String spellCode, String spellName, String spellDescription) {
		if (StringUtil.isEmpty(spellCode)) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return false;
		}

		if (StringUtil.isEmpty(spellName)) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return false;
		}

		if (spellName.length() >= 200) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return false;
		}
		
		return true;
	}

}
