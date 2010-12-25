package net.bulletcanvas.controller.login.google;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class AuthControllerTest extends ControllerTestCase {

	@Test
	public void run() throws Exception {
		tester.start("/login/google/auth");
		AuthController controller = tester.getController();
		assertThat(controller, is(notNullValue()));
		assertThat(tester.isRedirect(), is(true));
		assertThat(
			tester.getDestinationPath(),
			is("/_ah/login?continue=http%3A%2F%2Flocalhost%2Flogin%2Fgoogle%2Fcallback"));
	}
}
