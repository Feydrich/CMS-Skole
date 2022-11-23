package hr.tvz.cmsskola.data.role;

import hr.tvz.cmsskola.data.claim.ClaimService;
import hr.tvz.cmsskola.data.logging.LoggingService;
import hr.tvz.cmsskola.data.user.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
  private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

  private final RoleRepository roleRepository;
  private final ClaimService claimService;
  private final UserService userService;
  private final LoggingService loggingService;
  private final ModelMapper modelMapper;

  public Role getById(Long id) {
    return roleRepository.findById(id).orElse(null);
  }

  public ResponseEntity<Role> save(Role role) {
    if (role.getId() != null) {
      role = fillWithPrev(role);
    }

    logger.info("Trying to save role {}", role.getName());

    role = roleRepository.save(role);

    String logText;
    HttpStatus httpStatus;
    if (role.getId() == null) {
      logText = "created role " + role.getName() + " id = " + role.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated role " + role.getName() + " id = " + role.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(role, httpStatus);
  }

  public void delete(Long id) {
    logger.info("Trying to delete role id {}", id);

    var optionalRole = roleRepository.findById(id);
    optionalRole.ifPresent(
        role -> {
          deleteForeignKeys(role);

          roleRepository.deleteById(role.getId());
          String logText = "deleted role " + role.getName() + " id= " + role.getId();
          loggingService.log(logger, logText);
        });
  }

  public Page<Role> get(Pageable pageable) {
    return roleRepository.findAll(pageable);
  }

  private void deleteForeignKeys(Role role) {
    role.getClaims().forEach(claim -> claimService.delete(claim.getId()));
    role.getUsers()
        .forEach(
            user -> {
              user.setRole(null);
              userService.save(user);
            });
  }

  private Role fillWithPrev(Role entity) {
    var optPrev = roleRepository.findById(entity.getId());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }
}
