package net.bulletcanvas.model;

import java.io.Serializable;
import java.util.Date;

import org.slim3.datastore.Attribute;
import org.slim3.datastore.CreationDate;
import org.slim3.datastore.Model;
import org.slim3.datastore.ModificationDate;
import org.slim3.datastore.json.Json;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Link;

@Model(schemaVersion = 1)
public class Account implements Serializable {

	private static final long serialVersionUID = 1L;

	@Attribute(primaryKey = true, json = @Json(ignore = true))
	private Key key;

	@Attribute(version = true, json = @Json(ignore = true))
	private Long version;

	/**
	 * アカウント番号
	 */
	private Long accountNumber;

	/**
	 * 画面に表示する名前。
	 */
	private String screenName;

	/**
	 * 画面に表示するイメージの URL。
	 */
	@Attribute(unindexed = true)
	private Link screenImageUrl;

	/**
	 * 作成日時
	 */
	@Attribute(listener = CreationDate.class)
	private Date createdAt;

	/**
	 * 更新日時
	 */
	@Attribute(listener = ModificationDate.class)
	private Date updatedAt;

	/**
	 * Returns the key.
	 * 
	 * @return the key
	 */
	public Key getKey() {
		return key;
	}

	/**
	 * Sets the key.
	 * 
	 * @param key
	 *            the key
	 */
	public void setKey(Key key) {
		this.key = key;
	}

	/**
	 * Returns the version.
	 * 
	 * @return the version
	 */
	public Long getVersion() {
		return version;
	}

	/**
	 * Sets the version.
	 * 
	 * @param version
	 *            the version
	 */
	public void setVersion(Long version) {
		this.version = version;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((key == null) ? 0 : key.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		Account other = (Account) obj;
		if (key == null) {
			if (other.key != null) {
				return false;
			}
		} else if (!key.equals(other.key)) {
			return false;
		}
		return true;
	}

	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}

	public String getScreenName() {
		return screenName;
	}

	public void setScreenImageUrl(String screenImageUrl) {
		if (screenImageUrl != null) {
			this.screenImageUrl = new Link(screenImageUrl);
		}
	}

	public void setScreenImageUrl(Link screenImageUrl) {
		this.screenImageUrl = screenImageUrl;
	}

	public Link getScreenImageUrl() {
		return screenImageUrl;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public Long getAccountNumber() {
		return accountNumber;
	}

}
