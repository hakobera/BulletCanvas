package net.bulletcanvas.model;

import org.slim3.tester.AppEngineTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class SpellCardTest extends AppEngineTestCase {

	private SpellCard model = new SpellCard();

	@Test
	public void test() throws Exception {
		assertThat(model, is(notNullValue()));
	}
}
