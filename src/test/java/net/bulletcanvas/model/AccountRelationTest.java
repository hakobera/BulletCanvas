package net.bulletcanvas.model;

import net.bulletcanvas.model.AccountRelation;

import org.slim3.tester.AppEngineTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class AccountRelationTest extends AppEngineTestCase {

	private AccountRelation model = new AccountRelation();

	@Test
	public void test() throws Exception {
		assertThat(model, is(notNullValue()));
	}
}
