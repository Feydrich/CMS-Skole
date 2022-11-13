package hr.tvz.cmsskola.data.webpage;

import hr.tvz.cmsskola.data.article.Article;
import hr.tvz.cmsskola.data.article.ArticleService;
import hr.tvz.cmsskola.data.claim.ClaimService;
import hr.tvz.cmsskola.data.image.Image;
import hr.tvz.cmsskola.data.image.ImageService;
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
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebPageService {
  private static final Logger logger = LoggerFactory.getLogger(WebPageService.class);

  private final WebPageRepository webPageRepository;
  private final ClaimService claimService;
  private final ImageService imageService;
  private final ArticleService articleService;
  private final LoggingService loggingService;
  private final ModelMapper modelMapper;

  public WebPage getById(Long id) {
    return webPageRepository.findById(id).orElse(null);
  }

  public ResponseEntity<WebPage> save(WebPage webPage) {
    if (webPage.getId() != null) {
      webPage = fillWithPrev(webPage);
    }

    logger.info("Trying to save webPage {}", webPage.getUrl());

    webPage = webPageRepository.save(webPage);

    String logText;
    HttpStatus httpStatus;
    if (webPage.getId() == null) {
      logText = "created webPage " + webPage.getUrl() + " id = " + webPage.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated webPage " + webPage.getUrl() + " id = " + webPage.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(webPage, httpStatus);
  }

  public void delete(Long id) throws IOException {
    logger.info("Trying to delete webPage id {}", id);

    var optionalWebPage = webPageRepository.findById(id);
    if (optionalWebPage.isPresent()) {
      WebPage webPage = optionalWebPage.get();
      deleteForeignKeys(webPage);

      webPageRepository.deleteById(webPage.getId());
      String logText = "deleted webPage " + webPage.getUrl() + " id= " + webPage.getId();
      loggingService.log(logger, logText);
    }
  }

  public Page<WebPage> get(Pageable pageable) {
    return webPageRepository.findAll(pageable);
  }

  private void deleteForeignKeys(WebPage webPage) throws IOException {
    webPage.getClaims().forEach(claim -> claimService.delete(claim.getId()));
    for (Image image : webPage.getImages()) {
      imageService.delete(image.getId());
    }
    for (Article article : webPage.getArticles()) {
      articleService.delete(article.getId());
    }
  }

  private WebPage fillWithPrev(WebPage entity) {
    var optPrev = webPageRepository.findById(entity.getId());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }
}
