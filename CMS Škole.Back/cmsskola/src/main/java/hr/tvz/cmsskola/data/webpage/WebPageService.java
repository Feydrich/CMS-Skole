package hr.tvz.cmsskola.data.webpage;

import hr.tvz.cmsskola.data.article.Article;
import hr.tvz.cmsskola.data.article.ArticleService;
import hr.tvz.cmsskola.data.claim.ClaimService;
import hr.tvz.cmsskola.data.image.Image;
import hr.tvz.cmsskola.data.image.ImageService;
import hr.tvz.cmsskola.data.logging.LoggingService;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
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

  private static final String HTML = ".html";
  private static final String PATH = "public/pages";

  public WebPage getById(Long id) {
    var webPage = webPageRepository.findById(id).orElse(null);
    readHtml(webPage);
    return webPage;
  }

  public ResponseEntity<WebPage> save(WebPage webPage) {
    if (webPage.getId() != null) {
      webPage = fillWithPrev(webPage);
    }

    logger.info("Trying to save webPage {}", webPage.getUrl());

    String url;
    try {
      url = saveFile(webPage.getUrl(), webPage.getHtml());
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
    webPage.setHtmlUri(url);

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
    var page =  webPageRepository.findAll(pageable);
    page.getContent().forEach(this::readHtml);
    return page;
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

  private String saveFile(String url, String html) throws IOException {
    String name = url.split("/^[^/]*/")[0] + RandomString.make(8) + "." + HTML;
    Path path = Path.of(PATH, name);

    makeDir();
    if (!path.toFile().createNewFile()) {
      throw new IOException("unable to create file");
    }
    byte[] htmlBytes = html.getBytes();
    Files.write(path, htmlBytes);

    return path.toString();
  }

  private void makeDir() {
    File rootDir = new File(PATH);
    if (!rootDir.isDirectory()) {
      logger.info("making directory {}", PATH);
      rootDir.mkdirs();
    }
  }

  private void readHtml(WebPage webPage) {
    if (webPage != null) {
      try {
        String html = Files.readAllLines(Path.of(webPage.getHtmlUri())).get(0);
        webPage.setHtml(html);
      } catch (IOException ignored) {
      }
    }
  }
}
