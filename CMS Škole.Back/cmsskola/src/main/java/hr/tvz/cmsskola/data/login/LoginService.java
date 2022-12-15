package hr.tvz.cmsskola.data.login;

import hr.tvz.cmsskola.config.security.jwt.JwtFilter;
import hr.tvz.cmsskola.config.security.jwt.TokenProvider;
import hr.tvz.cmsskola.data.logging.LoggingService;
import hr.tvz.cmsskola.data.user.User;
import hr.tvz.cmsskola.data.user.UserRepository;
import hr.tvz.cmsskola.data.user.UserService;
import java.io.Serializable;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
  private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

  private final UserRepository userRepository;
  private final TokenProvider tokenProvider;
  private final AuthenticationManagerBuilder authenticationManagerBuilder;
  private final LoggingService loggingService;

  public ResponseEntity<UserToken> login(LoginDTO login) {
    logger.debug("attempting to login {}", login.username);
    UsernamePasswordAuthenticationToken authenticationToken =
        new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());

    Authentication authentication;
    authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.createToken(authentication);

    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

    var user = userRepository.findByUsername(login.getUsername()).orElse(null);

    if (user != null) {
      loggingService.log(logger, "logged in", user.getId());
    }

    UserService.setData(user);
    return new ResponseEntity<>(new UserToken(jwt, user), httpHeaders, HttpStatus.OK);
  }

  public void logout() {
    loggingService.log(logger, "logged out");
  }

  @Data
  static class LoginDTO {
    @NotNull private String username;
    @NotNull private String password;
  }

  @Data
  @AllArgsConstructor
  static class UserToken implements Serializable {
    private String token;
    private User user;
  }
}
