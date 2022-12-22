package hr.tvz.cmsskola.data.image;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "image")
public class ImageController {
  private final ImageService imageService;

  @GetMapping(path = "{id}")
  public ResponseEntity<Resource> getById(@PathVariable Long id) {
    return imageService.getById(id);
  }

  @PreAuthorize(
      "@authenticationService.checkAuthorize("
          + "T(hr.tvz.cmsskola.data.common.AuthType).ARTICLE, #article)")
  @PostMapping(path = "save")
  public ResponseEntity<Image> save(
      @RequestParam(required = false) Long article, @RequestParam MultipartFile file) {
    return imageService.save(article, file);
  }

  @PreAuthorize(
      "@authenticationService.checkAuthorize("
          + "T(hr.tvz.cmsskola.data.common.AuthType).IMAGE, #id)")
  @DeleteMapping(path = "")
  public ResponseEntity<Image> delete(@RequestParam Long id) {
    try {
      imageService.delete(id);
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
