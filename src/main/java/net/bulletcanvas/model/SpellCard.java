package net.bulletcanvas.model;

import java.io.Serializable;
import java.util.Date;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Text;

import org.slim3.datastore.Attribute;
import org.slim3.datastore.CreationDate;
import org.slim3.datastore.Model;
import org.slim3.datastore.ModificationDate;

/**
 * 弾幕定義情報です。
 */
@Model(schemaVersion = 1)
public class SpellCard implements Serializable {

	private static final long serialVersionUID = 1L;

	@Attribute(primaryKey = true)
	private Key key;

	@Attribute(version = true)
	private Long version;

	/** スペル所有アカウント */
	@Attribute(primaryKey = false)
	private Key accountKey;

	/** スペル名 */
	private String name;

	/** 説明 */
	private String description;

	/** スペル・コード。各画面の URL に使用します。 */
	private String code;
	
	/** スペル定義 */
	private Text definition;

	/** 作成日時 */
	@Attribute(listener = CreationDate.class)
	private Date createdAt;

	/** 更新日時 */
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
		SpellCard other = (SpellCard) obj;
		if (key == null) {
			if (other.key != null) {
				return false;
			}
		} else if (!key.equals(other.key)) {
			return false;
		}
		return true;
	}

	public void setAccountKey(Key accountKey) {
		this.accountKey = accountKey;
	}

	public Key getAccountKey() {
		return accountKey;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
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

	public void setDefinition(Text definition) {
		this.definition = definition;
	}

	public void setDefinition(String definition) {
		if (definition != null) {
			this.definition = new Text(definition); 
		} else {
			this.definition = null;
		}
	}

	public Text getDefinition() {
		return definition;
	}
}
