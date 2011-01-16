package net.bulletcanvas.service;

import static com.google.appengine.api.datastore.Query.FilterOperator.*;

import java.util.Collections;
import java.util.List;

import net.bulletcanvas.meta.SpellCardMeta;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.model.SpellCard;
import net.bulletcanvas.util.Base62;

import org.slim3.datastore.Datastore;
import org.slim3.datastore.Sort;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Query.SortDirection;

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
	 * @param account
	 *            スペル所有アカウント
	 * @param spellCard
	 *            格納するスペルカード情報
	 * @return スペルカード情報のインスタンス
	 */
	public static SpellCard put(Account account, SpellCard spellCard) {
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
	 * スペルコードに対応するスペルカード情報を検索します。
	 * 
	 * @param spellCode
	 *            スペルコード
	 * @return 条件に一致するスペルカード
	 */
	public static SpellCard findBySpellCode(String spellCode) {
		return Datastore
			.query(SpellCard.class)
			.filter(SpellCardMeta.get().code.getAttributeName(), EQUAL, spellCode)
			.asSingle();
	}

	/**
	 * スペル定義情報のみを更新します。
	 * 
	 * @param spellCode
	 *            Spell Code
	 * @param spellDefintion
	 *            Spell definition.
	 * @return スペルカード情報のインスタンス
	 */
	public static SpellCard updateDefinition(String spellCode, String spellDefintion) {
		SpellCard spellCard = findBySpellCode(spellCode);
		if (spellCard == null) {
			return null;
		}

		spellCard.setDefinition(spellDefintion);
		Datastore.put(spellCard);
		return spellCard;
	}

	/**
	 * スペルカード情報を検索します。 検索結果は作成日時降順にソートされます。
	 * 
	 * @param limit
	 *            最大取得数
	 * @return 作成日時降順にソートされたスペルカード一覧
	 */
	public static List<SpellCard> findAllNew(int limit) {
		Sort sort = new Sort(SpellCardMeta.get().createdAt.getName(), SortDirection.DESCENDING);
		return Datastore.query(SpellCard.class).sort(sort).limit(limit).asList();
	}

	/**
	 * 指定したアカウントが保有するスペルカード情報を検索します。 検索結果は作成日時順にソートされます。
	 * 
	 * @param offset
	 *            オフセット
	 * @param limit
	 *            最大取得数
	 * @return 作成日時順にソートされたスペルカード一覧
	 */
	public static List<SpellCard> findAllByAccount(Long accountNumber, int offset, int limit) {
		Account account = AccountService.findByAccountNumber(accountNumber);
		if (account == null) {
			return Collections.emptyList();
		}
		
		Sort sort = new Sort(SpellCardMeta.get().createdAt.getName(), SortDirection.DESCENDING);
		return Datastore
			.query(SpellCard.class)
			.filter(SpellCardMeta.get().accountKey.getAttributeName(), EQUAL, account.getKey())
			.sort(sort)
			.offset(offset)
			.limit(limit)
			.asList();
	}

}
