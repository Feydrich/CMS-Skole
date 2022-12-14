package hr.tvz.cmsskola.data.category;

import java.util.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends PagingAndSortingRepository<Category, Long> {

  @Query("select c from Category c where c.superCategory.id = :superCategoryId")
  Collection<Category> findAllBySuperCategory(Long superCategoryId);

  @Query("select c from Category c where c.superCategory is null")
  Collection<Category> findSuperCategories();
}
