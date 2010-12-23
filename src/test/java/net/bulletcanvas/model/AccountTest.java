package net.bulletcanvas.model;

import net.bulletcanvas.model.Account;

import org.slim3.tester.AppEngineTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class AccountTest extends AppEngineTestCase {

    private Account model = new Account();

    @Test
    public void test() throws Exception {
        assertThat(model, is(notNullValue()));
    }
}
