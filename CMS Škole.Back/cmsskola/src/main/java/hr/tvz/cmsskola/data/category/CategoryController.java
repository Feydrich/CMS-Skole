package hr.tvz.cmsskola.data.category;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import java.util.Collection;
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
@RequestMapping(path = "category")
public class CategoryController {
  private final CategoryService categoryService;

  @GetMapping(path = "{id}")
  public Category getById(@PathVariable Long id) {
    return categoryService.getById(id);
  }

  @GetMapping(path = "getBySuperCategory/{superCategoryId}")
  public Collection<Category> getBySuperCategory(@PathVariable Long superCategoryId) {
    return categoryService.getBySuperCategory(superCategoryId);
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
  public Page<Category> get(@ApiIgnore Pageable pageable) {
    return categoryService.get(pageable);
  }

  // todo preautorize admin
  @PostMapping(path = "save")
  public ResponseEntity<Category> save(@Valid @RequestBody Category category) {
    return categoryService.save(category);
  }

  // todo preautorize admin
  @DeleteMapping(path = "")
  public ResponseEntity<Category> delete(@RequestParam Long id) {
    categoryService.delete(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
