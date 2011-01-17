package net.bulletcanvas.controller.api;

import javax.servlet.http.HttpServletResponse;

import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Text;
import com.google.appengine.repackaged.com.google.common.base.StringUtil;

import net.bulletcanvas.controller.Parameter;
import net.bulletcanvas.meta.SpellThumbnailMeta;
import net.bulletcanvas.model.SpellThumbnail;

/**
 * サムネイルを管理する REST API です。
 */
public class SpellThumbnailController extends ApiControllerBase {

	/**
	 * サムネイル画像を返します。
	 */
	@Override
	protected void get() throws Exception {
		String spellCode = asString(Parameter.SPELL_CODE);
		if (StringUtil.isEmpty(spellCode)) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		Key key = Datastore.createKey(SpellThumbnail.class, spellCode);
		SpellThumbnail thumbnail = Datastore.get(SpellThumbnailMeta.get(), key);
		
		returnAsDataUrl(thumbnail.getDataUrl().getValue(), thumbnail.getUpdatedAt());
	}

	/**
	 * サムネイル画像の投稿用 URLです。
	 */
	@Override
	protected void post() throws Exception {
		// TODO: ログイン＆所有者チェック
		
		String spellCode = asString(Parameter.SPELL_CODE);
		if (StringUtil.isEmpty(spellCode)) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		String dataUrl = asString(Parameter.THUMBNAIL_DATA_URL);
		
		Key key = Datastore.createKey(SpellThumbnail.class, spellCode);
		SpellThumbnail thumbnail = new SpellThumbnail();
		thumbnail.setKey(key);
		thumbnail.setDataUrl(new Text(dataUrl));
		Datastore.put(thumbnail);
	}
	
}
