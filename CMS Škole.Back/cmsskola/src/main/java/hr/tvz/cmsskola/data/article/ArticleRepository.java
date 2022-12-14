package hr.tvz.cmsskola.data.article;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {

  @Query("SELECT a FROM Article a WHERE a.author.id = :id")
  List<Article> findByAuthor(Long id);
}
