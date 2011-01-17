package net.bulletcanvas.controller.api.spellcard;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.arnx.jsonic.JSON;
import net.bulletcanvas.controller.api.ApiControllerBase;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.model.SpellCardInfo;
import net.bulletcanvas.service.SpellCardService;

/**
 * SpellCard 新着一覧情報を返す REST API です。
 * Spell 情報に PV などの付加情報をつけた上で、Spell 定義情報を除いたものを返します。
 */
public class NewDeveloppedController extends ApiControllerBase {

	@Override
	protected void get() throws Exception {
		List<SpellCard> spellCards = SpellCardService.findAllNew(100);

		List<SpellCardInfo> spellCardInfo = new ArrayList<SpellCardInfo>();
		for (SpellCard spellCard : spellCards) {
			SpellCardInfo info = SpellCardInfo.createFrom(spellCard);
			
			// dummy info
			info.setPageViewPoint(Double.valueOf(Math.floor(Math.random() * 1000)).intValue());
			info.setFavoritePoint(Double.valueOf(Math.floor(Math.random() * 1000)).intValue());
			
			spellCardInfo.add(info);
		}
		
		String json = JSON.encode(spellCardInfo);
		Date lastModified = spellCards.isEmpty() ? new Date() : spellCards.get(0).getCreatedAt();
		returnAsJson(json, lastModified);
	}
	
}
