package hr.tvz.cmsskola.data.image;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "image")
public class ImageController {
  private final ImageService imageService;

  @GetMapping(path = "{id}")
  public ResponseEntity<Resource> getById(@PathVariable Long id) {
    return imageService.getById(id);
  }

  @GetMapping(path = "gallery")
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
  public Page<Image> get(@ApiIgnore Pageable pageable) {
    return imageService.getGalleyr(pageable);
  }

  // todo preautorize admin
  @PostMapping(path = "save")
  public ResponseEntity<Image> save(
      @RequestParam(required = false) Long article,
      @RequestParam(required = false) Boolean gallery,
      @RequestParam MultipartFile file) {
    return imageService.save(article, gallery, file);
  }

  // todo preautorize admin
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
