package hr.tvz.cmsskola.data.image;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends PagingAndSortingRepository<Image, Long> {

  @Query("SELECT i FROM Image i WHERE i.gallery = true")
  Page<Image> findForGallery(Pageable pageable);
}
