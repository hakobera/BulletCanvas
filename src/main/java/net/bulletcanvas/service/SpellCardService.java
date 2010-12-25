package net.bulletcanvas.service;

import java.util.List;

import org.slim3.datastore.Datastore;
import org.slim3.datastore.Sort;

import com.google.appengine.api.datastore.Key;

import net.bulletcanvas.meta.SpellCardMeta;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.model.SpellCard;

/**
 * スペルカードに関連するサービスです。
 */
public class SpellCardService {
	
	/**
	 * スペルカードを新規作成し、データストアに格納します。
	 * 
	 * @param accountId スペル所有アカウント
	 * @param spellCard 格納するスペルカード情報
	 * @return スペルカード情報のインスタンス
	 */
	public SpellCard put(String accountId, SpellCard spellCard) {
		Account account = AccountService.findByAccountId(accountId);
		spellCard.setAccountKey(account.getKey());
		Key key = Datastore.put(spellCard);
		spellCard.setKey(key);
		return spellCard;
	}

	/**
	 * スペルカード情報を検索します。
	 * 検索結果は作成日時順にソートされます。
	 * 
	 * @return 作成日時順にソートされたスペルカード一覧
	 */
	public List<SpellCard> findAll() {
		Sort sort = new Sort(SpellCardMeta.get().createdAt.getName());
		return Datastore.query(SpellCard.class).sort(sort).asList();
	}
	
}
