package hr.tvz.cmsskola.data.user;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping(path = "user")
public class UserController {
  @Autowired public final UserService userService;

  @GetMapping(path = "{id}")
  public User getById(@PathVariable Long id) {
    return userService.getById(id);
  }

  @GetMapping(path = "")
  public User getByUsername(@RequestParam String username) {
    return userService.getByUsername(username);
  }

  @GetMapping(path = "all")
  @ApiImplicitParams({
      @ApiImplicitParam(name = "page", value = "0", paramType = "query"),
      @ApiImplicitParam(name = "size", value = "20", paramType = "query"),
      @ApiImplicitParam(name = "sort", value = "name,surname,DESC", allowMultiple = true,
          paramType = "query")
  })
  public Page<User> getAll(@ApiIgnore Pageable pageable) {
    return userService.getAll(pageable);
  }

  // todo preautorize admin
  @PostMapping(path = "save")
  public ResponseEntity<User> save(@Valid @RequestBody User user) {
    return userService.save(user);
  }

  // todo preautorize admin
  @DeleteMapping(path = "")
  public ResponseEntity<String> delete(@RequestParam Long id) {
    userService.delete(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
