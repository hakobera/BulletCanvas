package net.bulletcanvas.controller;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import net.bulletcanvas.controller.LogoutController;

import org.junit.Test;
import org.slim3.tester.ControllerTestCase;

public class LogoutControllerTest extends ControllerTestCase {

	@Test
	public void run() throws Exception {
		tester.start("/logout");
		LogoutController controller = tester.getController();
		assertThat(controller, is(notNullValue()));
		assertThat(tester.isRedirect(), is(true));
		assertThat(tester.getDestinationPath(), is("/"));
	}
}
