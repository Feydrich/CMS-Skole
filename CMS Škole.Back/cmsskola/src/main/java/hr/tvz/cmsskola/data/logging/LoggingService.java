package hr.tvz.cmsskola.data.logging;

import hr.tvz.cmsskola.data.login.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoggingService {
  @Autowired
  public final LoggingRepository loggingRepository;

  public void log(Logger logger, String text, Long userId) {
    logger.info("user {} " + text, userId);
    var log = Log.builder()
        .text(text)
        .user(User.builder().id(userId).build())
        .build();
    loggingRepository.save(log);
  }

}
