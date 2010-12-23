package net.bulletcanvas.model;

public enum AccountType {
	Twitter;
	
	public String getAccoutTypeName() {
		return name().toLowerCase();
	}
	
	public String createUniqueAccountId(String accountId) {
		return String.format("%s:%s", getAccoutTypeName(), accountId);
	}
	
}
