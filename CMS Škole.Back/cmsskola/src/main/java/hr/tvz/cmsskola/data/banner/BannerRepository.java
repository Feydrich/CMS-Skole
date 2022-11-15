package hr.tvz.cmsskola.data.banner;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends PagingAndSortingRepository<Banner, Long> {}
