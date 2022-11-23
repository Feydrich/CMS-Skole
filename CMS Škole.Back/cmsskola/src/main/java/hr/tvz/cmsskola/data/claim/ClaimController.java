package hr.tvz.cmsskola.data.claim;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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
@RequestMapping(path = "claim")
public class ClaimController {
  private final ClaimService claimService;

  @GetMapping(path = "{id}")
  public Claim getById(@PathVariable Long id) {
    return claimService.getById(id);
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
  public Page<Claim> get(@ApiIgnore Pageable pageable) {
    return claimService.get(pageable);
  }

  // todo preautorize admin
  @PostMapping(path = "save")
  public ResponseEntity<Claim> save(@Valid @RequestBody Claim claim) {
    return claimService.save(claim);
  }

  // todo preautorize admin
  @DeleteMapping(path = "")
  public ResponseEntity<Claim> delete(@RequestParam Long id) {
    claimService.delete(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
