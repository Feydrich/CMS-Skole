package hr.tvz.cmsskola.data.image;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends PagingAndSortingRepository<Image, Long> {}
