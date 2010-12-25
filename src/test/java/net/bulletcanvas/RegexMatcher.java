package net.bulletcanvas;

import java.util.regex.Pattern;

import org.hamcrest.Description;
import org.junit.internal.matchers.TypeSafeMatcher;

public class RegexMatcher extends TypeSafeMatcher<String> {

	public static TypeSafeMatcher<String> matches(String criteria) {
		return new RegexMatcher(criteria);
	}

	private final String criteria;
	private final Pattern pattern;

	public RegexMatcher(String criteria) {
		this.criteria = criteria;
		this.pattern = Pattern.compile(criteria);
	}

	@Override
	public void describeTo(Description description) {
		description.appendText("is matched /").appendValue(criteria).appendText("/");
	}

	@Override
	public boolean matchesSafely(String object) {
		return null != object && null != criteria && pattern.matcher(object).matches();
	}

}
