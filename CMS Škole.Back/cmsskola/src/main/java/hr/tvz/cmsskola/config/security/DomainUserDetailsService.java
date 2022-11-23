package hr.tvz.cmsskola.config.security;

import hr.tvz.cmsskola.data.user.User;
import hr.tvz.cmsskola.data.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component("userDetailsService")
@RequiredArgsConstructor
public class DomainUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(final String username) {

    return userRepository
        .findByUsername(username)
        .map(this::createSpringSecurityUser)
        .orElseThrow(
            () ->
                new UsernameNotFoundException(
                    "User " + username + " was not found in the database"));
  }

  private org.springframework.security.core.userdetails.User createSpringSecurityUser(User user) {
    return new org.springframework.security.core.userdetails.User(
        user.getUsername(), user.getPassword(), user.getAuthorities());
  }
}
