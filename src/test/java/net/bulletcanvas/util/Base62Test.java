package net.bulletcanvas.util;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import org.junit.Test;

/**
 * {@link Base62} のテストケースです。
 * 
 */
public class Base62Test {

	@Test
	public void testEncode() {
		assertThat(Base62.encode(0), is("a"));
		assertThat(Base62.encode(25), is("z"));
		assertThat(Base62.encode(26), is("A"));
		assertThat(Base62.encode(51), is("Z"));
		assertThat(Base62.encode(52), is("1"));
		assertThat(Base62.encode(61), is("0"));
		assertThat(Base62.encode(62), is("ba"));
		assertThat(Base62.encode(124), is("ca"));
	}

}
