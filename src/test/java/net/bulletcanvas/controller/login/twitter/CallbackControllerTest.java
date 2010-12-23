package net.bulletcanvas.controller.login.twitter;

import net.bulletcanvas.controller.login.twitter.CallbackController;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class CallbackControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception {
        tester.start("/twitter/callback");
        CallbackController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is("/twitter/callback.jsp"));
    }
}
