package net.bulletcanvas.service;

import net.bulletcanvas.model.Account;
import net.bulletcanvas.model.AccountRelation;

import org.slim3.datastore.Datastore;
import org.slim3.datastore.EntityNotFoundRuntimeException;

import com.google.appengine.api.datastore.Key;

public class AccountService {

	private AccountService() {
	}

	/**
	 * Account を新規作成します。
	 * 
	 * @param account
	 *            　アカウント情報
	 * @return アカウント情報
	 */
	public static Account put(String accountId, Account account) {
		Key accountKey = Datastore.put(account);
		account.setKey(accountKey);

		Key relationKey = Datastore.createKey(AccountRelation.class, accountId);
		AccountRelation relation = new AccountRelation();
		relation.setKey(relationKey);
		relation.setAccountKey(accountKey);
		Datastore.put(relation);

		return account;
	}

	/**
	 * アカウント情報をアカウントキー から取得します。
	 * 
	 * @param accountKeyString
	 *            アカウントの GUID を文字列化したもの
	 * @return アカウント情報
	 */
	public static Account findByKey(String accountKeyString) {
		Key accountKey = Datastore.stringToKey(accountKeyString);
		Account account = Datastore.get(Account.class, accountKey);
		return account;
	}

	/**
	 * アカウント情報をアカウントID から取得します。
	 * 
	 * @param accountId
	 *            アカウントID
	 * @return アカウント情報
	 */
	public static Account findByAccountId(String accountId) {
		Key relationKey = Datastore.createKey(AccountRelation.class, accountId);
		AccountRelation relation = Datastore.get(AccountRelation.class, relationKey);
		Account account = Datastore.get(Account.class, relation.getAccountKey());
		return account;
	}

	/**
	 * アカウント認証をおこないます。 アカウントが存在しない場合は新規に作成します。
	 * 
	 * @param accountId
	 *            アカウント ID
	 * @param screenName
	 *            アカウント名
	 * @param profileImageUrl
	 *            プロファイル画像の URL (null可)
	 */
	public static Account auth(String accountId, String screenName, String profileImageUrl) {
		Account account = null;
		try {
			account = AccountService.findByAccountId(accountId);
		} catch (EntityNotFoundRuntimeException e) {
			account = new Account();
			account.setScreenName(screenName);
			account.setScreenImageUrl(profileImageUrl);
			put(accountId, account);
		}
		return account;
	}

}
