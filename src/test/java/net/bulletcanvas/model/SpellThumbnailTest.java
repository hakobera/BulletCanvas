package net.bulletcanvas.model;

import org.slim3.tester.AppEngineTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class SpellThumbnailTest extends AppEngineTestCase {

    private SpellThumbnail model = new SpellThumbnail();

    @Test
    public void test() throws Exception {
        assertThat(model, is(notNullValue()));
    }
}
