package net.bulletcanvas.controller.spell;

import static net.bulletcanvas.RegexMatcher.*;
import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import net.bulletcanvas.controller.ControllerBase;
import net.bulletcanvas.model.Account;

import org.junit.Test;
import org.slim3.tester.ControllerTestCase;

public class NewControllerTest extends ControllerTestCase {

	@Test
	public void run() throws Exception {
		Account account = new Account();
		account.setScreenName("test");
		tester.sessionScope(ControllerBase.SESSION_ACCOUNT, account);

		tester.start("/spell/new");
		CreateController controller = tester.getController();
		assertThat(controller, is(notNullValue()));
		assertThat(tester.isRedirect(), is(true));
		assertThat(tester.getDestinationPath(), matches("/test/([a-zA-Z0-9]+)/edit"));
	}

}
