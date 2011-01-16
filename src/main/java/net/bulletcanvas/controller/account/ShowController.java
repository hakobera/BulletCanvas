package net.bulletcanvas.controller.account;

import net.bulletcanvas.controller.ControllerBase;
import net.bulletcanvas.controller.Parameter;
import net.bulletcanvas.model.Account;
import net.bulletcanvas.service.AccountService;

import org.slim3.controller.Navigation;

public class ShowController extends ControllerBase {

    @Override
    public Navigation run() throws Exception {
		Long accountNumber = asLong(Parameter.ACCOUNT_NUMBER);
		Account account = AccountService.findByAccountNumber(accountNumber);
		if (account == null) {
			throw new IllegalArgumentException("Account not found");
		}
		debug("account:%s", account);
		debug("accountNumber:%s", accountNumber);
		requestScope("account", account);
    	return forward("show.jsp");
    }
    
}
