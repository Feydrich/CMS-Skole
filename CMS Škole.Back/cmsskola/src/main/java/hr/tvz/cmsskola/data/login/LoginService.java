package hr.tvz.cmsskola.data.login;

import hr.tvz.cmsskola.config.security.SecurityUtils;
import hr.tvz.cmsskola.config.security.jwt.JwtFilter;
import hr.tvz.cmsskola.config.security.jwt.TokenProvider;
import hr.tvz.cmsskola.data.logging.LoggingService;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
  Logger logger = LoggerFactory.getLogger(LoginService.class);

  @Autowired public final UserRepository userRepository;

  @Autowired public final TokenProvider tokenProvider;

  @Autowired public final AuthenticationManagerBuilder authenticationManagerBuilder;

  @Autowired private final LoggingService loggingService;

  public ResponseEntity<JWTToken> login(LoginDTO login) {
    logger.debug("attempting to login {}", login.username);
    UsernamePasswordAuthenticationToken authenticationToken =
        new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());

    Authentication authentication;
      authentication =
          authenticationManagerBuilder.getObject().authenticate(authenticationToken);

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.createToken(authentication);

    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

    var optionalUser = userRepository.findByUsername(login.getUsername());
    optionalUser.ifPresent(user -> loggingService.log(logger, "logged in", user.getId()));

    return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
  }

  public void logout() {
    var optionalUsername = SecurityUtils.getCurrentUserUsername();
    optionalUsername.ifPresent(username -> {
      var optionalUser = userRepository.findByUsername(username);
      optionalUser.ifPresent(user -> loggingService.log(logger, "logged out", user.getId()));
    });
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
    @NotNull
    private String username;
    @NotNull private String password;
  }
}
