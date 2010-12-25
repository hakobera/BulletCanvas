package net.bulletcanvas.controller.spell;

import net.bulletcanvas.controller.ControllerBase;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.service.AccountService;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class EditControllerTest extends ControllerTestCase {

	@Test
	public void run() throws Exception {
		Account account = AccountService.auth("test", "test", "");
		tester.sessionScope(ControllerBase.SESSION_ACCOUNT, account);
		
		tester.start("/test/abcd/edit");
		EditController controller = tester.getController();
		assertThat(controller, is(notNullValue()));
		assertThat(tester.isRedirect(), is(false));
		assertThat(tester.getDestinationPath(), is("/spell/edit.jsp"));
	}
	
	@Test
	public void runNotLogin() throws Exception {
		tester.start("/test/abcd/edit");
		EditController controller = tester.getController();
		assertThat(controller, is(notNullValue()));
		assertThat(tester.isRedirect(), is(true));
		assertThat(tester.getDestinationPath(), is("/login/?redirect=/test/abcd/edit"));
	}
	
}
