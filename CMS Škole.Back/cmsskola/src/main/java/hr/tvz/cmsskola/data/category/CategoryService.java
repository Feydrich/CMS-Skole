package hr.tvz.cmsskola.data.category;

import hr.tvz.cmsskola.data.logging.LoggingService;
import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
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
  private final LoggingService loggingService;
  private final ModelMapper modelMapper;

  public Category getById(Long id) {
    Category category = categoryRepository.findById(id).orElse(null);
    if (category != null) {
      setTransient(category);
    }

    return category;
  }

  private void setTransient(Category category) {
    Category superCategory = category.getSuperCategory();
    if (superCategory != null) {
      category.setSuperCategory(
          Category.builder().id(superCategory.getId()).name(superCategory.getName()).build());
    }
    if (category.getSubCategories() == null) {
      category.setSubCategories(Collections.EMPTY_LIST);
    }
  }

  public Collection<Category> getBySuperCategory(Long superCategoryId) {
    Collection<Category> categories = categoryRepository.findAllBySuperCategory(superCategoryId);
    categories.forEach(this::setTransient);

    return categories;
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

  public void delete(Long id) throws IOException {
    logger.info("Trying to delete category id {}", id);

    var optionalCategory = categoryRepository.findById(id);
    if (optionalCategory.isPresent()) {
      Category category = optionalCategory.get();
      deleteForeignKeys(category);

      categoryRepository.deleteById(category.getId());
      String logText = "deleted category " + category.getName() + " id= " + category.getId();
      loggingService.log(logger, logText);
    }
  }

  public Page<Category> get(Pageable pageable) {
    Page<Category> page = categoryRepository.findAll(pageable);
    page.getContent().forEach(this::setTransient);
    return page;
  }

  private void deleteForeignKeys(Category category) throws IOException {
    for (Category subCategory : getBySuperCategory(category.getId())) {
      delete(subCategory.getId());
    }
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

  public Collection<Category> getSuperCategories() {
    Collection<Category> categories = categoryRepository.findSuperCategories();
    categories.forEach(
        cat -> {
          cat.setSubCategories(getBySuperCategory(cat.getId()));
          setTransient(cat);
        });
    return categories;
  }
}
