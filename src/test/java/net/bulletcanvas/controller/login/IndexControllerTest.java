package net.bulletcanvas.controller.login;

import net.bulletcanvas.controller.login.IndexController;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class IndexControllerTest extends ControllerTestCase {

	@Test
	public void run() throws Exception {
		tester.start("/login/");
		IndexController controller = tester.getController();
		assertThat(controller, is(notNullValue()));
		assertThat(tester.isRedirect(), is(false));
		assertThat(tester.getDestinationPath(), is("/login/index.jsp"));
	}
}
