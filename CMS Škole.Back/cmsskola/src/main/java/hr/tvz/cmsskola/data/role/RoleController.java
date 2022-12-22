package hr.tvz.cmsskola.data.role;

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
@RequestMapping(path = "role")
public class RoleController {
  private final RoleService roleService;

  @GetMapping(path = "{id}")
  public Role getById(@PathVariable Long id) {
    return roleService.getById(id);
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
  public Page<Role> get(@ApiIgnore Pageable pageable) {
    return roleService.get(pageable);
  }

  @PreAuthorize(
      "@authenticationService.checkAuthorize("
          + "T(hr.tvz.cmsskola.data.common.AuthType).ROLE, #role.getId())")
  @PostMapping(path = "save")
  public ResponseEntity<Role> save(@Valid @RequestBody Role role) {
    return roleService.save(role);
  }

  @PreAuthorize(
      "@authenticationService.checkAuthorize("
          + "T(hr.tvz.cmsskola.data.common.AuthType).ROLE, #id)")
  @DeleteMapping(path = "")
  public ResponseEntity<Role> delete(@RequestParam Long id) {
    roleService.delete(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
