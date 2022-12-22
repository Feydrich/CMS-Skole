package hr.tvz.cmsskola.data.login;

import hr.tvz.cmsskola.data.login.LoginService.UserToken;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {
  private final LoginService loginService;

  @PostMapping(path = "/login")
  public ResponseEntity<UserToken> login(@Valid @RequestBody LoginService.LoginDTO login) {
    return loginService.login(login);
  }

  @GetMapping(path = "/logout")
  public HttpStatus logout() {
    loginService.logout();
    return HttpStatus.OK;
  }
}
