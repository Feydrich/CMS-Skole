package hr.tvz.cmsskola.data.category;

import hr.tvz.cmsskola.data.claim.ClaimService;
import hr.tvz.cmsskola.data.logging.LoggingService;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
  private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);

  private final CategoryRepository categoryRepository;
  private final ClaimService claimService;
  private final LoggingService loggingService;
  private final ModelMapper modelMapper;

  public Category getById(Long id) {
    return categoryRepository.findById(id).orElse(null);
  }

  public Collection<Category> getBySuperCategory(Long superCategoryId) {
    return categoryRepository.findAllBySuperCategory(superCategoryId);
  }

  public ResponseEntity<Category> save(Category category) {
    if (category.getId() != null) {
      category = fillWithPrev(category);
    }

    logger.info("Trying to save category {}", category.getName());

    category = categoryRepository.save(category);

    String logText;
    HttpStatus httpStatus;
    if (category.getId() == null) {
      logText = "created category " + category.getName() + " id = " + category.getId();
      httpStatus = HttpStatus.CREATED;
    } else {
      logText = "updated category " + category.getName() + " id = " + category.getId();
      httpStatus = HttpStatus.OK;
    }
    loggingService.log(logger, logText);

    return new ResponseEntity<>(category, httpStatus);
  }

  public void delete(Long id) {
    logger.info("Trying to delete category id {}", id);

    var optionalCategory = categoryRepository.findById(id);
    optionalCategory.ifPresent(
        category -> {
          deleteForeignKeys(category);

          categoryRepository.deleteById(category.getId());
          String logText = "deleted category " + category.getName() + " id= " + category.getId();
          loggingService.log(logger, logText);
        });
  }

  public Page<Category> get(Pageable pageable) {
    return categoryRepository.findAll(pageable);
  }

  private void deleteForeignKeys(Category category) {
    category.getClaims().forEach(claim -> claimService.delete(claim.getId()));
    category.getWebPages().forEach(webpage -> claimService.delete(webpage.getId()));
    getBySuperCategory(category.getId()).forEach(subCategory -> delete(subCategory.getId()));
  }

  private Category fillWithPrev(Category entity) {
    var optPrev = categoryRepository.findById(entity.getId());
    if (optPrev.isPresent()) {
      var prev = optPrev.get();
      modelMapper.map(entity, prev);
      entity = prev;
    }
    return entity;
  }
}
