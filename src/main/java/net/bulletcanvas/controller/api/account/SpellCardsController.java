package net.bulletcanvas.controller.api.account;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.arnx.jsonic.JSON;
import net.bulletcanvas.controller.Parameter;
import net.bulletcanvas.controller.api.ApiControllerBase;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.model.SpellCardInfo;
import net.bulletcanvas.service.SpellCardService;

/**
 * アカウントが保有するスペルの一覧を返します。 TODO: ページング
 */
public class SpellCardsController extends ApiControllerBase {

	@Override
	protected void get() throws Exception {
		Long accountNumber = null;
		try {
			accountNumber = asLong(Parameter.ACCOUNT_NUMBER);
			if (accountNumber == null) {
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return;
			}
		} catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		debug("accountNumber %s", accountNumber);

		List<SpellCard> spellCards = SpellCardService.findAllByAccount(accountNumber, 0, 12);

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
