package net.bulletcanvas.service;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.slim3.tester.AppEngineTester;

import net.bulletcanvas.model.Account;

/**
 * {@link AccountService} のテストケースです。
 */
public class AccountServiceTest {

	private static AppEngineTester testHelper;

	@Before
	public void setUp() throws Exception {
		testHelper = new AppEngineTester();
		testHelper.setUp();
	}

	@After
	public void tearDown() throws Exception {
		testHelper.tearDown();
	}

	@Test
	public void testPut() {
		Account account = new Account();
		account.setScreenName("sample");
		String accountId = "test";
		AccountService.put(accountId, account);

		assertThat(AccountService.findByAccountId(accountId), is(account));
	}

}
