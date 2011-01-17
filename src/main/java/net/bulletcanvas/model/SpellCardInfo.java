package net.bulletcanvas.model;

import java.io.Serializable;
import java.util.Date;

/**
 * SpellCard + 付加情報 - Spell 定義に対応する仮想 Model です。
 */
public class SpellCardInfo implements Serializable {
	
	private static final long serialVersionUID = 1L;

	/**
	 * 開発したアカウントのアカウント番号
	 */
	private Long accountNumber;
	
	/**
	 * スペルコード
	 */
	private String code;

	/**
	 * スペル名
	 */
	private String name;
	
	/**
	 * スペルの説明
	 */
	private String description;
	
	/**
	 * サムネイルの URL
	 */
	private String thumbnailUrl;
	
	/**
	 * PV 数
	 */
	private Integer pageViewPoint;
	
	/**
	 * お気に入り数
	 */
	private Integer favoritePoint;
	
	/**
	 * 作成日時
	 */
	private Date createdAt;
	
	/**
	 * 更新日時
	 */
	private Date updatedAt;
	
	public Long getAccountNumber() {
		return accountNumber;
	}
	
	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getThumbnailUrl() {
		return thumbnailUrl;
	}

	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}

	public Integer getPageViewPoint() {
		return pageViewPoint;
	}

	public void setPageViewPoint(Integer pageViewPoint) {
		this.pageViewPoint = pageViewPoint;
	}

	public Integer getFavoritePoint() {
		return favoritePoint;
	}

	public void setFavoritePoint(Integer favoritePoint) {
		this.favoritePoint = favoritePoint;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	public static SpellCardInfo createFrom(SpellCard spellCard) {
		SpellCardInfo info = new SpellCardInfo();
		info.setAccountNumber(spellCard.getAccountNumber());
		info.setCode(spellCard.getCode());
		info.setName(spellCard.getName());
		info.setDescription(spellCard.getDescriptionAsString());
		info.setThumbnailUrl("/api/spellThumbnail/" + spellCard.getCode());
		info.setCreatedAt(spellCard.getCreatedAt());
		info.setUpdatedAt(spellCard.getUpdatedAt());
		return info;
	}
	
}
