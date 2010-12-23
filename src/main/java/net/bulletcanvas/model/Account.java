package net.bulletcanvas.model;

import java.io.Serializable;
import java.util.Date;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Link;

import org.slim3.datastore.Attribute;
import org.slim3.datastore.CreationDate;
import org.slim3.datastore.Model;
import org.slim3.datastore.ModificationDate;

@Model(schemaVersion = 1)
public class Account implements Serializable {

    private static final long serialVersionUID = 1L;

    @Attribute(primaryKey = true)
    private Key key;

    @Attribute(version = true)
    private Long version;
    
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
     * 画面に表示するイメージ(小)の URL。
     */
    @Attribute(unindexed = true)
    private Link screenMiniImageUrl;

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
		this.screenImageUrl = new Link(screenImageUrl);
	}

	public void setScreenImageUrl(Link screenImageUrl) {
		this.screenImageUrl = screenImageUrl;
	}

	public void setScreenMiniImageUrl(String screenMiniImageUrl) {
		this.screenMiniImageUrl = new Link(screenMiniImageUrl);
	}

	public void setScreenMiniImageUrl(Link screenMiniImageUrl) {
		this.screenMiniImageUrl = screenMiniImageUrl;
	}

	public Link getScreenMiniImageUrl() {
		return screenMiniImageUrl;
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
	
}
