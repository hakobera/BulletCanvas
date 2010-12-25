package net.bulletcanvas.controller.login;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import net.bulletcanvas.meta.AccountMeta;
import net.bulletcanvas.model.Account;

import org.slim3.controller.Navigation;

/**
 * ログイン状態をチェックします。
 */
public class CheckController extends LoginControllerBase {

	@Override
	public Navigation run() throws Exception {
		if (!isLogin()) {
			if (!autoLogin()) {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return null;
			}
		}

		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();

		Account account = getLoginAccount();
		String accountInfo = AccountMeta.get().modelToJson(account, 1);
		writer.write(accountInfo);
		writer.flush();

		return null;
	}

}
