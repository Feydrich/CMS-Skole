package hr.tvz.cmsskola.data.user;

import hr.tvz.cmsskola.data.claim.ClaimService;
import hr.tvz.cmsskola.data.logging.LoggingService;
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

  public Page<User> getAll(Pageable pageable) {
    return userRepository.findAll(pageable);
  }

  public User getById(Long userId) {
    return userRepository.findById(userId).orElse(null);
  }

  public User getByUsername(String username) {
    return userRepository.findByUsername(username).orElse(null);
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

    return new ResponseEntity<>(user, httpStatus);
  }

  public void delete(Long userId) {
    logger.info("Trying to delete user id {}", userId);

    var optionalUser = userRepository.findById(userId);
    optionalUser.ifPresent(
        user -> {
          deleteForeignKeys(user);

          userRepository.deleteById(user.getId());
          String logText = "deleted user " + user.getUsername() + " id= " + user.getId();
          loggingService.log(logger, logText);
        });
  }

  private void encryptPassword(User user) {
    if (user.getPassword() != null) {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
    }
  }

  private void deleteForeignKeys(User user) {
    user.getClaims().forEach(claim -> claimService.delete(claim.getId()));
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
}
