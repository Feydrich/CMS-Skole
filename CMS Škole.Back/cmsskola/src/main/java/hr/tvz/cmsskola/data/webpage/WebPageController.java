package hr.tvz.cmsskola.data.webpage;

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
@RequestMapping(path = "webpage")
public class WebPageController {
  private final WebPageService webPageService;

  @GetMapping(path = "{id}")
  public WebPage getById(@PathVariable Long id) {
    return webPageService.getById(id);
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
  public Page<WebPage> get(@ApiIgnore Pageable pageable) {
    return webPageService.get(pageable);
  }

  // todo preautorize admin
  @PostMapping(path = "save")
  public ResponseEntity<WebPage> save(@Valid @RequestBody WebPage webPage) {
    return webPageService.save(webPage);
  }

  // todo preautorize admin
  @DeleteMapping(path = "")
  public ResponseEntity<WebPage> delete(@RequestParam Long id) {
    try {
      webPageService.delete(id);
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
