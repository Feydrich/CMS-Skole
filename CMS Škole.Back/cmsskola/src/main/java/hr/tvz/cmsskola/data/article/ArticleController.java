package hr.tvz.cmsskola.data.article;

import java.io.IOException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "article")
public class ArticleController {
  private final ArticleService articleService;

  @GetMapping(path = "{id}")
  public Article getById(@PathVariable Long id) {
    return articleService.getById(id);
  }

  // todo preautorize admin, add image uppload
  @PostMapping(path = "save")
  public ResponseEntity<Article> save(@Valid @RequestBody Article article) {
    return articleService.save(article);
  }

  // todo preautorize admin
  @DeleteMapping(path = "")
  public ResponseEntity<Article> delete(@RequestParam Long id) {
    try {
      articleService.delete(id);
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
