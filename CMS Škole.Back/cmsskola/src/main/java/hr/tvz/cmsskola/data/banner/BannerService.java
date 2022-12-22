package hr.tvz.cmsskola.data.banner;

import hr.tvz.cmsskola.data.image.ImageService;
import hr.tvz.cmsskola.data.logging.LoggingService;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BannerService {
  private static final Logger logger = LoggerFactory.getLogger(BannerService.class);

  private final BannerRepository bannerRepository;
  private final ImageService imageService;
  private final LoggingService loggingService;
  private final ModelMapper modelMapper;

  public Banner getById(Long id) {
    return bannerRepository.findById(id).orElse(null);
  }

  public ResponseEntity<Banner> save(Banner banner) {
    if (banner.getId() != null) {
      banner = fillWithPrev(banner);
    } else {
      banner.setCreated(LocalDateTime.now());
    }

    logger.info("Trying to save banner {}", banner.getName());

    banner = bannerRepository.save(banner);

    String logText;
    HttpStatus httpStatus;
    if (banner.getId() == null) {
      logText = "created banner " + banner.getName() + " id = " + banner.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated banner " + banner.getName() + " id = " + banner.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(banner, httpStatus);
  }

  public void delete(Long id) throws IOException {
    logger.info("Trying to delete banner id {}", id);

    var optionalBanner = bannerRepository.findById(id);
    if (optionalBanner.isPresent()) {
      Banner banner = optionalBanner.get();
      File file = new File(banner.getName());
      if (!file.delete()) {
        throw new IOException("unable to delete file");
      }

      deleteForeignKeys(banner);

      bannerRepository.deleteById(banner.getId());
      String logText = "deleted banner " + banner.getName() + " id= " + banner.getId();
      loggingService.log(logger, logText);
    }
  }

  private void deleteForeignKeys(Banner banner) throws IOException {
    imageService.delete(banner.getImage().getId());
  }

  private Banner fillWithPrev(Banner entity) {
    var optPrev = bannerRepository.findById(entity.getId());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }
}
