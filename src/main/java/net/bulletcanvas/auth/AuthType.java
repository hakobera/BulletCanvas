package net.bulletcanvas.auth;

public enum AuthType {
	Twitter, Google;
	
	public String getAccoutTypeName() {
		return name().toLowerCase();
	}
	
	public String createUniqueAccountId(String accountId) {
		return String.format("%s:%s", getAccoutTypeName(), accountId);
	}
	
}
