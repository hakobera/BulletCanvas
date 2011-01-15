package net.bulletcanvas.controller.api;

import javax.servlet.http.HttpServletResponse;

import org.slim3.util.StringUtil;

import net.bulletcanvas.controller.Parameter;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.service.SpellCardService;

/**
 * Spell Entity に対応する REST API です。
 * 
 * <dl>
 * 	 <dt>URL</dt>
 *   <dd>http://www.danmaku.jp/api/spellDefinition/{spellCode}</dd>
 *   
 *   <dt>Allowed Method</dt>
 *   <dd>GET</dd>
 * </dl>
 */
public class SpellDefinitionController extends ApiControllerBase {
	
	/**
	 * Get spell definition.
	 */
	@Override
	protected void get() throws Exception {
		String spellCode = asString(Parameter.SPELL_CODE);
		SpellCard spellCard = SpellCardService.findBySpellCode(spellCode);
		
		//String json = SpellCardMeta.get().modelToJson(spellCard, 1);
		// TODO: modelToJson が改行をエスケープできない問題の修正待ち
		returnAsXml(spellCard.getDefinitionAsString(), spellCard.getUpdatedAt());
	}
	
	/**
	 * Update spell definition.
	 */
	@Override
	protected void post() throws Exception {
		// TODO: 権限チェック
		String spellCode = asString(Parameter.SPELL_CODE);
		String spellDefinition = asString(Parameter.SPELL_DEFINITION);
		
		debug("spellDefinition=%s", spellDefinition);
		
		if (StringUtil.isEmpty(spellCode) || StringUtil.isEmpty(spellDefinition)) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		SpellCard spellCard = SpellCardService.updateDefinition(spellCode, spellDefinition);
		if (spellCard == null) {
			// TODO: 例外にした方が設計として綺麗？
			// spell card not found.
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

}
