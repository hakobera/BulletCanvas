package net.bulletcanvas.controller.api.account;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class SpellCardControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception {
        tester.start("/api/account/spellCard");
        SpellCardsController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is(nullValue()));
    }
}
