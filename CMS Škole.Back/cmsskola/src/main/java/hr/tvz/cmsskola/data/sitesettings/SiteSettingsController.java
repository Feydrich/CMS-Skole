package hr.tvz.cmsskola.data.sitesettings;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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

  @PreAuthorize(
      "@authenticationService.checkAuthorize("
          + "T(hr.tvz.cmsskola.data.common.AuthType).SITE_SETTINGS, null)")
  @PostMapping(path = "save")
  public ResponseEntity<SiteSetting> save(@Valid @RequestBody SiteSetting siteSetting) {
    return siteSettingsService.save(siteSetting);
  }

  @PreAuthorize(
      "@authenticationService.checkAuthorize("
          + "T(hr.tvz.cmsskola.data.common.AuthType).SITE_SETTINGS, null)")
  @DeleteMapping(path = "")
  public ResponseEntity<SiteSetting> delete(@RequestParam String property) {
    siteSettingsService.delete(property);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
