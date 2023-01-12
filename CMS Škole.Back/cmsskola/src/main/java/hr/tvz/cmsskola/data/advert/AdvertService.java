package hr.tvz.cmsskola.data.advert;

import hr.tvz.cmsskola.data.article.Article;
import hr.tvz.cmsskola.data.image.ImageService;
import hr.tvz.cmsskola.data.logging.LoggingService;
import java.io.File;
import java.io.IOException;
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
public class AdvertService {
  private static final Logger logger = LoggerFactory.getLogger(AdvertService.class);

  private final AdvertRepository advertRepository;
  private final ImageService imageService;
  private final LoggingService loggingService;
  private final ModelMapper modelMapper;

  public Advert getById(Long id) {
    return advertRepository.findById(id).orElse(null);
  }

  public Page<Advert> get(Pageable pageable) {
    return advertRepository.findAll(pageable);
  }

  public ResponseEntity<Advert> save(Advert advert) {
    if (advert.getId() != null) {
      advert = fillWithPrev(advert);
    }

    logger.info("Trying to save advert {}", advert.getName());

    advert = advertRepository.save(advert);

    String logText;
    HttpStatus httpStatus;
    if (advert.getId() == null) {
      logText = "created advert " + advert.getName() + " id = " + advert.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated advert " + advert.getName() + " id = " + advert.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(advert, httpStatus);
  }

  public void delete(Long id) throws IOException {
    logger.info("Trying to delete advert id {}", id);

    var optionalAdvert = advertRepository.findById(id);
    if (optionalAdvert.isPresent()) {
      Advert advert = optionalAdvert.get();
      File file = new File(advert.getName());
      if (!file.delete()) {
        throw new IOException("unable to delete file");
      }

      deleteForeignKeys(advert);

      advertRepository.deleteById(advert.getId());
      String logText = "deleted advert " + advert.getName() + " id= " + advert.getId();
      loggingService.log(logger, logText);
    }
  }

  private void deleteForeignKeys(Advert advert) throws IOException {
    imageService.delete(advert.getImage().getId());
  }

  private Advert fillWithPrev(Advert entity) {
    var optPrev = advertRepository.findById(entity.getId());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }
}
