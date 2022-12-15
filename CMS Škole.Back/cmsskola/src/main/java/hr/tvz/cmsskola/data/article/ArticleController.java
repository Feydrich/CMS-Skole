package hr.tvz.cmsskola.data.article;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import java.io.IOException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "article")
public class ArticleController {
  private final ArticleService articleService;

  @GetMapping(path = "{id}")
  public Article getById(@PathVariable Long id) {
    return articleService.getById(id);
  }

  @GetMapping(path = "getByCategory/{id}")
  @ApiImplicitParams({
    @ApiImplicitParam(
        name = "page",
        value = "0",
        paramType = "query",
        dataTypeClass = Integer.class),
    @ApiImplicitParam(
        name = "size",
        value = "20",
        paramType = "query",
        dataTypeClass = Integer.class),
    @ApiImplicitParam(
        name = "sort",
        value = "name,surname,DESC",
        allowMultiple = true,
        paramType = "query",
        dataTypeClass = String.class)
  })
  public Page<Article> getByCategoryId(@ApiIgnore Pageable pageable, @PathVariable Long id) {
    return articleService.getByCategoryId(pageable, id);
  }

  @GetMapping(path = "getByAuthorId/{id}")
  @ApiImplicitParams({
    @ApiImplicitParam(
        name = "page",
        value = "0",
        paramType = "query",
        dataTypeClass = Integer.class),
    @ApiImplicitParam(
        name = "size",
        value = "20",
        paramType = "query",
        dataTypeClass = Integer.class),
    @ApiImplicitParam(
        name = "sort",
        value = "name,surname,DESC",
        allowMultiple = true,
        paramType = "query",
        dataTypeClass = String.class)
  })
  public Page<Article> getByAuthorId(@ApiIgnore Pageable pageable, @PathVariable Long id) {
    return articleService.getByAuthorId(pageable, id);
  }

  @GetMapping(path = "")
  @ApiImplicitParams({
    @ApiImplicitParam(
        name = "page",
        value = "0",
        paramType = "query",
        dataTypeClass = Integer.class),
    @ApiImplicitParam(
        name = "size",
        value = "20",
        paramType = "query",
        dataTypeClass = Integer.class),
    @ApiImplicitParam(
        name = "sort",
        value = "name,surname,DESC",
        allowMultiple = true,
        paramType = "query",
        dataTypeClass = String.class)
  })
  public Page<Article> get(@ApiIgnore Pageable pageable) {
    return articleService.get(pageable);
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
