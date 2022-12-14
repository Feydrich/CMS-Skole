package hr.tvz.cmsskola.data.logging;

import hr.tvz.cmsskola.config.security.SecurityUtils;
import hr.tvz.cmsskola.data.user.User;
import hr.tvz.cmsskola.data.user.UserRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LoggingService {
  private final LoggingRepository loggingRepository;
  private final UserRepository userRepository;

  public void log(Logger logger, String text, Long userId) {
    logger.info("user {} " + text, userId);
    var log =
        Log.builder()
            .text(text)
            .user(User.builder().id(userId).build())
            .tstamp(LocalDateTime.now())
            .build();
    loggingRepository.save(log);
  }

  public void log(Logger logger, String text) {
    var optionalUsername = SecurityUtils.getCurrentUserUsername();
    optionalUsername.ifPresent(
        username -> {
          var optinalUser = userRepository.findByUsername(username);
          optinalUser.ifPresent(user -> log(logger, text, user.getId()));
        });
  }

  @Transactional
  public void deleteByUser(Long userId) {
    loggingRepository.deleteByUserId(userId);
  }
}
