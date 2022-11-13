package hr.tvz.cmsskola.data.article;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleService {
  private static final Logger logger = LoggerFactory.getLogger(ArticleService.class);

  private final ArticleRepository articleRepository;
  private final ImageService imageService;
  private final LoggingService loggingService;
  private final ModelMapper modelMapper;

  private static final String HTML = ".html";
  private static final String PATH = "images";

  public Article getById(Long id) {
    Article article = articleRepository.findById(id).orElse(null);
    readHtml(article);
    return article;
  }

  public ResponseEntity<Article> save(Article article) {
    if (article.getId() != null) {
      article = fillWithPrev(article);
    }

    logger.info("Trying to save article {}", article.getTitle());

    String url;
    try {
      url = saveFile(article.getTitle(), article.getHtml());
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
    article.setHtmlUri(url);

    article = articleRepository.save(article);

    String logText;
    HttpStatus httpStatus;
    if (article.getId() == null) {
      logText = "created Article " + article.getTitle() + " id = " + article.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated Article " + article.getTitle() + " id = " + article.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(article, httpStatus);
  }

  public void delete(Long id) throws IOException {
    logger.info("Trying to delete Article id {}", id);

    var optionalArticle = articleRepository.findById(id);
    if (optionalArticle.isPresent()) {
      Article article = optionalArticle.get();
      File file = new File(article.getHtmlUri());
      if (!file.delete()) {
        throw new IOException();
      }

      deleteForeignKeys(article);

      articleRepository.deleteById(article.getId());
      String logText = "deleted Article " + article.getTitle() + " id= " + article.getId();
      loggingService.log(logger, logText);
    }
  }

  private void deleteForeignKeys(Article article) throws IOException {
    for (Image image : article.getImages()) {
      imageService.delete(image.getId());
    }
  }

  private Article fillWithPrev(Article entity) {
    var optPrev = articleRepository.findById(entity.getId());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }

  private String saveFile(String title, String html) throws IOException {
    String name = title + RandomString.make(8) + "." + HTML;
    Path path = Path.of(PATH, name);

    byte[] htmlBytes = html.getBytes();
    Files.write(path, htmlBytes);

    return path.toString();
  }

  private void readHtml(Article article) {
    if (article != null) {
      try {
        String html = Files.readAllLines(Path.of(article.getHtmlUri())).get(0);
        article.setHtml(html);
      } catch (IOException ignored) {
      }
    }
  }
}
