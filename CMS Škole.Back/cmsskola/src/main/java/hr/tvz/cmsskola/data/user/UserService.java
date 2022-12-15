package hr.tvz.cmsskola.data.user;

import hr.tvz.cmsskola.data.article.Article;
import hr.tvz.cmsskola.data.article.ArticleService;
import hr.tvz.cmsskola.data.claim.ClaimService;
import hr.tvz.cmsskola.data.logging.LoggingService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
  private static final Logger logger = LoggerFactory.getLogger(UserService.class);

  private final UserRepository userRepository;
  private final ClaimService claimService;
  private final LoggingService loggingService;
  private final PasswordEncoder passwordEncoder;
  private final ModelMapper modelMapper;
  private final ArticleService articleService;

  public Page<User> getAll(Pageable pageable) {
    Page<User> page = userRepository.findAll(pageable);
    page.getContent().forEach(UserService::setData);
    return page;
  }

  public User getById(Long userId) {
    var user = userRepository.findById(userId).orElse(null);
    if (user != null) {
      setData(user);
    }
    return user;
  }

  public User getByUsername(String username) {
    var user = userRepository.findByUsername(username).orElse(null);
    if (user != null) {
      setData(user);
    }
    return user;
  }

  public ResponseEntity<User> save(User user) {
    encryptPassword(user);
    if (user.getId() != null) {
      user = fillWithPrev(user);
    }

    logger.info("Trying to save user {}", user.getUsername());

    user = userRepository.save(user);

    String logText;
    HttpStatus httpStatus;
    if (user.getId() == null) {
      logText = "created user " + user.getUsername() + " id = " + user.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated user " + user.getUsername() + " id = " + user.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    setData(user);
    return new ResponseEntity<>(user, httpStatus);
  }

  public void delete(Long userId) throws IOException {
    logger.info("Trying to delete user id {}", userId);

    var optionalUser = userRepository.findById(userId);

    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      deleteForeignKeys(user);

      userRepository.deleteById(user.getId());
      String logText = "deleted user " + user.getUsername() + " id= " + user.getId();
      loggingService.log(logger, logText);
    }
  }

  private void encryptPassword(User user) {
    if (user.getPassword() != null) {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
    }
  }

  private void deleteForeignKeys(User user) throws IOException {
    user.getClaims().forEach(claim -> claimService.delete(claim.getId()));
    for (Article article : articleService.getByAuthor(user.getId())) {
      articleService.delete(article.getId());
    }
    loggingService.deleteByUser(user.getId());
  }

  private User fillWithPrev(User entity) {
    var optPrev = userRepository.findById(entity.getId());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }

  public static void setData(User user) {
    if (user == null) return;
    user.setPassword(null);
  }
}
