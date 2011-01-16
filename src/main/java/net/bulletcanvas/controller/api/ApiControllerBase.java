package net.bulletcanvas.controller.api;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.SimpleTimeZone;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletResponse;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

/**
 * REST API の共通コントローラです。
 */
public abstract class ApiControllerBase extends Controller {
	
	private Logger logger = Logger.getLogger(getClass().getName());
	
	@Override
	protected Navigation run() throws Exception {
		if (isGet()) {
			get();
		} else if (isPost()) {
			post();
		} else if (isPut()) {
			put();
		} else if (isDelete()) {
			delete();
		}
		return null;
	}

	/**
	 * GET メソッドに対応するレスポンスを返します。
	 * 
	 * @throws Exception
	 */
	protected void get() throws Exception {
		methodNotAllowed();
	}

	/**
	 * POST メソッドに対応するレスポンスを返します。
	 * 
	 * @throws Exception
	 */
	protected void post() throws Exception {
		methodNotAllowed();
	}

	/**
	 * PUT メソッドに対応するレスポンスを返します。
	 * 
	 * @throws Exception
	 */
	protected void put() throws Exception {
		methodNotAllowed();
	}

	/**
	 * DELETE メソッドに対応するレスポンスを返します。
	 * 
	 * @throws Exception
	 */
	protected void delete() throws Exception {
		methodNotAllowed();
	}

	/**
	 * JSON 形式でレスポンスを返します。
	 */
	protected void returnAsJson(String json, Date lastModified)
			throws Exception {
		write(json, "application/json", lastModified);
	}

	/**
	 * XML 形式でレスポンスを返します。
	 */
	protected void returnAsXml(String xml, Date lastModified)
			throws Exception {
		write(xml, "application/xml", lastModified);
	}
	
	/**
	 * Write debug log.
	 */
	protected void debug(String message, Object... params) {
		if (logger.isLoggable(Level.FINE)) {
			logger.fine(String.format(message, params));
		}
	}

	private void write(String content, String contentType, Date lastModified) throws Exception {
		response.setContentType(contentType);
		response.setCharacterEncoding("utf-8");
		response.setHeader("Last-Modified", toGMTString(lastModified));

		PrintWriter writer = response.getWriter();
		writer.write(content);
		writer.flush();
	}
	
	private String toGMTString(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy HH:mm:ss z",
				Locale.UK);
		sdf.setTimeZone(new SimpleTimeZone(0, "GMT"));
		return sdf.format(date);
	}

	private void methodNotAllowed() {
		response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
	}

}
