package net.bulletcanvas.util;

/**
 * int を base62 に変換するユーティリティです。
 */
public abstract class Base62 {

	private static final String CHARS = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "1234567890";

	private static int RADIX = 62;

	public static String encode(int n) {
		n = Math.abs(n);
		StringBuilder sb = new StringBuilder();
		do {
			int x = n % RADIX;
			sb.insert(0, CHARS.charAt(x));
			n = n / RADIX;
		} while (n > 0);
		return sb.toString();
	}

}
