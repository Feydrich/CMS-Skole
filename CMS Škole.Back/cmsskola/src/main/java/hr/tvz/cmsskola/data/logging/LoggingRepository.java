package hr.tvz.cmsskola.data.logging;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoggingRepository extends PagingAndSortingRepository<Log, Long> {

}
