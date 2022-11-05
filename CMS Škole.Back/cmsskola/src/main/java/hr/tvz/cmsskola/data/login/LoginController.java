package hr.tvz.cmsskola.data.login;

import hr.tvz.cmsskola.config.security.jwt.JwtFilter;
import hr.tvz.cmsskola.config.security.jwt.TokenProvider;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {
  @Autowired public LoginService loginService;

  @Autowired public final TokenProvider tokenProvider;

  @Autowired public final AuthenticationManagerBuilder authenticationManagerBuilder;

  @PostMapping("/login")
  public ResponseEntity<JWTToken> login(@Valid @RequestBody LoginDTO login) {

    UsernamePasswordAuthenticationToken authenticationToken =
        new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());

    Authentication authentication =
        authenticationManagerBuilder.getObject().authenticate(authenticationToken);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.createToken(authentication);

    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

    return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
  }

  /**
   * Return jwt token in body because Angular has problems with parsing plain string response entity
   */
  @Data
  @AllArgsConstructor
  static class JWTToken {
    private String token;
  }

  @Data
  static class LoginDTO {
    @NotNull private String username;
    @NotNull private String password;
  }
}
