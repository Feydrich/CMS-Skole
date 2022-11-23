package hr.tvz.cmsskola.data.claim;

import hr.tvz.cmsskola.data.logging.LoggingService;
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
public class ClaimService {
  private static final Logger logger = LoggerFactory.getLogger(ClaimService.class);

  private final ClaimRepository claimRepository;
  private final LoggingService loggingService;
  private final ModelMapper modelMapper;

  public Claim getById(Long id) {
    return claimRepository.findById(id).orElse(null);
  }

  public ResponseEntity<Claim> save(Claim claim) {
    if (claim.getId() != null) {
      claim = fillWithPrev(claim);
    }

    logger.info("Trying to save claim {}", claim.getAuthority());

    claim = claimRepository.save(claim);

    String logText;
    HttpStatus httpStatus;
    if (claim.getId() == null) {
      logText = "created claim " + claim.getAuthority() + " id = " + claim.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated claim " + claim.getAuthority() + " id = " + claim.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(claim, httpStatus);
  }

  public void delete(Long id) {
    logger.info("Trying to delete claim id {}", id);

    var optionalClaim = claimRepository.findById(id);
    optionalClaim.ifPresent(
        claim -> {
          claimRepository.deleteById(claim.getId());
          String logText = "deleted claim " + claim.getAuthority() + " id= " + claim.getId();
          loggingService.log(logger, logText);
        });
  }

  public Page<Claim> get(Pageable pageable) {
    return claimRepository.findAll(pageable);
  }

  private Claim fillWithPrev(Claim entity) {
    var optPrev = claimRepository.findById(entity.getId());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }
}
