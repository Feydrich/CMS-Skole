package hr.tvz.cmsskola.data.login;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

  @Query("SELECT u FROM User u WHERE u.username = :username")
  Optional<User> findByUsername(String username);
}
