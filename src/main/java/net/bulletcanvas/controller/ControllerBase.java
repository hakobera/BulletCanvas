package net.bulletcanvas.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Logger;

import net.bulletcanvas.model.Account;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

/**
 * 全てのコントローラに共通するメソッドをまとめたクラスです。
 * このサービスの全てのコントローラは特別な理由がない限り、
 * このクラスを継承して作成します。
 */
public abstract class ControllerBase extends Controller {

	protected Logger logger = Logger.getLogger(getClass().getName());
	
	/**
	 * ログイン後のリダイレクトパラメータ名
	 */
	public static final String PARAM_REDIRECT = "redirect";

	/**
	 * アカウント情報を格納するセッションキー
	 */
	public static final String SESSION_ACCOUNT = "ACCOUNT";

	/**
	 * ログインしているかどうかを返します。
	 * 
	 * @return ログインしている場合は  true、していない場合は false
	 */
	protected boolean isLogin() {
		return sessionScope(SESSION_ACCOUNT) != null;
	}

	/**
	 * ログインしているアカウントのアカウント情報を返します。
	 * 
	 * @return ログインしているアカウントのアカウント情報
	 */
	protected Account getLoginAccount() {
		return sessionScope(SESSION_ACCOUNT);
	}

	/**
	 * ログイン後に呼び出し元にリダイレクトされるログイン画面への {@link Navigation} を返します。
	 * 
	 * @return ログイン後に呼び出し元にリダイレクトされるログイン画面への {@link Navigation}
	 */
	protected Navigation redirectToLoginUrl() {
		return redirect(String.format("/login/?%s=%s", PARAM_REDIRECT, basePath));
	}

	/**
	 * ログイン後に指定したパスにリダイレクトされるログイン画面への {@link Navigation} を返します。
	 * 
	 * @param redirectPath リダイレクト URL
	 * @return ログイン後に指定したパスにリダイレクトされるログイン画面への  {@link Navigation}
	 */
	protected Navigation redirectToLoginUrl(String redirectPath) {
		return redirect(String.format("/login/?%s=%s", PARAM_REDIRECT, redirectPath));
	}
	
	/**
	 * URL を作成します。
	 * テンプレート中には {@link String#format(String, Object...)} で利用可能なパラメータを指定できます。
	 * 
	 * @param pathTemplate パスのテンプレート文字列
	 * @param parameters 置換パラメータ
	 * @return URL 文字列
	 */
	protected String path(String pathTemplate, Object... parameters) {
		return String.format(pathTemplate, parameters);
	}

	/**
	 * War 内のファイルを読み込みます。
	 * 
	 * @param path ファイルへのパス
	 * @return ファイルの内容
	 */
	protected String loadFromLoacalFile(String path) {
		InputStream is = null;
		try {
			URL url = servletContext.getResource(path);
			is = url.openStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(is, "utf-8"));
			StringBuilder buffer = new StringBuilder();
			while (reader.ready()) {
				if (buffer.length() != 0) {
					buffer.append("\n");
				}
				buffer.append(reader.readLine());
			}
			return buffer.toString();
		} catch (MalformedURLException e) {
			logger.fine(e.getMessage());
			return "";
		} catch (IOException e) {
			logger.fine(e.getMessage());
			return "";
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					// ignore
				}
			}
		}
	}
	
}
