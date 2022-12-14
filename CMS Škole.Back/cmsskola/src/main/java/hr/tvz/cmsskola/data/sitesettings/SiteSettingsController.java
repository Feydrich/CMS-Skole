package hr.tvz.cmsskola.data.sitesettings;

import hr.tvz.cmsskola.data.article.Article;
import hr.tvz.cmsskola.data.article.ArticleService;
import hr.tvz.cmsskola.data.category.Category;
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
@RequestMapping(path = "site_settings")
public class SiteSettingsController {
  private final SiteSettingsService siteSettingsService;

  @GetMapping(path = "{property}")
  public SiteSetting getByProperty(@PathVariable String property) {
    return siteSettingsService.getByProperty(property);
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
  public Page<SiteSetting> get(@ApiIgnore Pageable pageable) {
    return siteSettingsService.get(pageable);
  }

  // todo preautorize admin, add image uppload
  @PostMapping(path = "save")
  public ResponseEntity<SiteSetting> save(@Valid @RequestBody SiteSetting siteSetting) {
    return siteSettingsService.save(siteSetting);
  }

  // todo preautorize admin
  @DeleteMapping(path = "")
  public ResponseEntity<SiteSetting> delete(@RequestParam String property) {
    siteSettingsService.delete(property);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
