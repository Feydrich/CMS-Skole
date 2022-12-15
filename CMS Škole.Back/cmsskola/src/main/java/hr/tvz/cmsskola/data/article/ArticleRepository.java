package hr.tvz.cmsskola.data.article;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {

  @Query("SELECT a FROM Article a WHERE a.author.id = :id")
  Collection<Article> findByAuthor(Long id);

  @Query("SELECT a FROM Article a WHERE a.category.id = :id AND a.archived = FALSE")
  Collection<Article> findByCategory(Long id);
}
