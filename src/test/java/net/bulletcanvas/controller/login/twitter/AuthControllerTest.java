package net.bulletcanvas.controller.login.twitter;

import static net.bulletcanvas.RegexMatcher.*;
import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import org.junit.Test;
import org.slim3.tester.ControllerTestCase;

public class AuthControllerTest extends ControllerTestCase {

	@Test
	public void run() throws Exception {
		tester.start("/login/twitter/auth");
		AuthController controller = tester.getController();
		assertThat(controller, is(notNullValue()));
		assertThat(tester.isRedirect(), is(true));
		assertThat(
			tester.getDestinationPath(),
			matches("http://api\\.twitter\\.com/oauth/authenticate\\?oauth_token=.*"));
	}

}