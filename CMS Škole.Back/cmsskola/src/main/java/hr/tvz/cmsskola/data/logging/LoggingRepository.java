package hr.tvz.cmsskola.data.logging;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoggingRepository extends PagingAndSortingRepository<Log, Long> {

  @Modifying
  @Query("DELETE FROM Log l WHERE l.user.id = :userId")
  void deleteByUserId(Long userId);
}
