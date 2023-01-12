package hr.tvz.cmsskola.data.article;

import java.util.Collection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {

  @Query("SELECT a FROM Article a WHERE a.author.id = :id")
  Collection<Article> findByAuthorForDelete(Long id);

  @Query("SELECT a "
      + "FROM Article a "
      + "WHERE a.archived = FALSE "
      + "AND (a.category.id = :id OR a.category.id IN "
      + "   (SELECT c.id FROM Category c WHERE c.superCategory = :id)"
      + ")")
  Page<Article> findByCategory(Long id, Pageable pageable);

  @Query("SELECT a FROM Article a WHERE a.author.id = :id")
  Page<Article> findByAuthor(Long id, Pageable pageable);
}
