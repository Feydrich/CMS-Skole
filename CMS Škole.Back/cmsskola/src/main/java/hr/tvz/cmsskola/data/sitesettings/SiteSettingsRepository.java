package hr.tvz.cmsskola.data.sitesettings;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteSettingsRepository extends PagingAndSortingRepository<SiteSetting, Long> {

  @Query("SELECT ss FROM SiteSetting ss WHERE ss.property = :property")
  Optional<SiteSetting> findByProperty(String property);
}
