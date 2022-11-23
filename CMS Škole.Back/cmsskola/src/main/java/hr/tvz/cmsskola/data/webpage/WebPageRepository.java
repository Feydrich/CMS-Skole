package hr.tvz.cmsskola.data.webpage;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebPageRepository extends PagingAndSortingRepository<WebPage, Long> {}
