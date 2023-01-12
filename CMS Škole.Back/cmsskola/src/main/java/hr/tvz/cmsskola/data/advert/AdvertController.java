package hr.tvz.cmsskola.data.advert;

import hr.tvz.cmsskola.data.article.Article;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import java.io.IOException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
@RequestMapping(path = "advert")
public class AdvertController {
  private final AdvertService advertService;

  @GetMapping(path = "{id}")
  public Advert getById(@PathVariable Long id) {
    return advertService.getById(id);
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
  public Page<Advert> get(@ApiIgnore Pageable pageable) {
    return advertService.get(pageable);
  }

  @PreAuthorize(
      "@authenticationService.checkAuthorize("
          + "T(hr.tvz.cmsskola.data.common.AuthType).BANNER, #advert.getId())")
  @PostMapping(path = "save")
  public ResponseEntity<Advert> save(@Valid @RequestBody Advert advert) {
    return advertService.save(advert);
  }

  @PreAuthorize(
      "@authenticationService.checkAuthorize("
          + "T(hr.tvz.cmsskola.data.common.AuthType).BANNER, #id)")
  @DeleteMapping(path = "")
  public ResponseEntity<Advert> delete(@RequestParam Long id) {
    try {
      advertService.delete(id);
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
