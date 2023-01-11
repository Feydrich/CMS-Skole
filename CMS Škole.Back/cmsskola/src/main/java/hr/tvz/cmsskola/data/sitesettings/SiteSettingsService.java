package hr.tvz.cmsskola.data.sitesettings;

import hr.tvz.cmsskola.data.logging.LoggingService;
import java.time.LocalDateTime;
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
public class SiteSettingsService {
  private static final Logger logger = LoggerFactory.getLogger(SiteSettingsService.class);

  private final SiteSettingsRepository siteSettingsRepository;
  private final LoggingService loggingService;
  private final ModelMapper modelMapper;

  public SiteSetting getByProperty(String property) {
    return siteSettingsRepository.findByProperty(property).orElse(null);
  }

  public Page<SiteSetting> get(Pageable pageable) {
    return siteSettingsRepository.findAll(pageable);
  }

  public ResponseEntity<SiteSetting> save(SiteSetting siteSetting) {
    siteSetting = fillWithPrev(siteSetting);
    siteSetting.setUpdated(LocalDateTime.now());

    logger.info("Trying to save site setting {}", siteSetting.getProperty());

    siteSetting = siteSettingsRepository.save(siteSetting);

    String logText;
    HttpStatus httpStatus;
    if (siteSetting.getId() == null) {
      logText = "created siteSetting " + siteSetting.getProperty() + " id = " + siteSetting.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated siteSetting " + siteSetting.getProperty() + " id = " + siteSetting.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(siteSetting, httpStatus);
  }

  public void delete(String property) {
    logger.info("Trying to delete siteSetting property {}", property);

    var optionalSiteSetting = siteSettingsRepository.findByProperty(property);
    if (optionalSiteSetting.isPresent()) {
      SiteSetting siteSetting = optionalSiteSetting.get();

      siteSettingsRepository.deleteById(siteSetting.getId());
      String logText =
          "deleted siteSetting " + siteSetting.getProperty() + " id= " + siteSetting.getId();
      loggingService.log(logger, logText);
    }
  }

  private SiteSetting fillWithPrev(SiteSetting entity) {
    var optPrev = siteSettingsRepository.findByProperty(entity.getProperty());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }
}
