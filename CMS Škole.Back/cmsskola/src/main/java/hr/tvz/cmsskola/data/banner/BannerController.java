package hr.tvz.cmsskola.data.banner;

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
@RequestMapping(path = "banner")
public class BannerController {
  private final BannerService bannerService;

  @GetMapping(path = "{id}")
  public Banner getById(@PathVariable Long id) {
    return bannerService.getById(id);
  }

  // todo preautorize admin, add image uppload
  @PostMapping(path = "save")
  public ResponseEntity<Banner> save(@Valid @RequestBody Banner banner) {
    return bannerService.save(banner);
  }

  // todo preautorize admin
  @DeleteMapping(path = "")
  public ResponseEntity<Banner> delete(@RequestParam Long id) {
    try {
      bannerService.delete(id);
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
