package net.bulletcanvas.service;

import static com.google.appengine.api.datastore.Query.FilterOperator.*;

import java.util.List;

import net.bulletcanvas.meta.SpellCardMeta;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.util.Base62;

import org.slim3.datastore.Datastore;
import org.slim3.datastore.Sort;

import com.google.appengine.api.datastore.Key;

/**
 * スペルカードに関連するサービスです。
 */
public abstract class SpellCardService {

	/**
	 * 指定したアカウントでスペルカードを新規作成し、データストアに格納します。 データは空の状態で作成されます。
	 * 
	 * @param account
	 *            スペル所有アカウント
	 * @return スペルカード情報のインスタンス
	 */
	public static SpellCard newAndPut(Account account) {
		SpellCard spellCard = new SpellCard();
		spellCard.setAccountKey(account.getKey());
		Key key = Datastore.allocateId(SpellCard.class);
		spellCard.setKey(key);
		String defaultSpellCode = Base62.encode(spellCard.hashCode());
		spellCard.setCode(defaultSpellCode);
		Datastore.put(spellCard);
		return spellCard;
	}

	/**
	 * スペルカードを新規作成し、データストアに格納します。
	 * 
	 * @param accountId
	 *            スペル所有アカウント
	 * @param spellCard
	 *            格納するスペルカード情報
	 * @return スペルカード情報のインスタンス
	 */
	public static SpellCard put(String accountId, SpellCard spellCard) {
		Account account = AccountService.findByAccountId(accountId);
		spellCard.setAccountKey(account.getKey());
		Key key = Datastore.put(spellCard);
		spellCard.setKey(key);
		return spellCard;
	}

	/**
	 * アカウント情報とスペルコードから対応するスペルカード情報を検索します。
	 * 
	 * @param account
	 *            アカウント情報
	 * @param spellCode
	 *            スペルコード
	 * @return 条件に一致するスペルカード
	 */
	public static SpellCard find(Account account, String spellCode) {
		return Datastore
			.query(SpellCard.class)
			.filter(SpellCardMeta.get().accountKey.getAttributeName(), EQUAL, account.getKey())
			.filter(SpellCardMeta.get().code.getAttributeName(), EQUAL, spellCode)
			.asSingle();
	}

	/**
	 * スペルカード情報を検索します。 検索結果は作成日時順にソートされます。
	 * 
	 * @return 作成日時順にソートされたスペルカード一覧
	 */
	public static List<SpellCard> findAll() {
		Sort sort = new Sort(SpellCardMeta.get().createdAt.getName());
		return Datastore.query(SpellCard.class).sort(sort).asList();
	}

}
