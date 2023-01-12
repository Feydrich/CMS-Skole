package hr.tvz.cmsskola.data.advert;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvertRepository extends PagingAndSortingRepository<Advert, Long> {}
