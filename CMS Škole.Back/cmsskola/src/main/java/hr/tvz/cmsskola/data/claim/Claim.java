package hr.tvz.cmsskola.data.claim;

import hr.tvz.cmsskola.data.category.Category;
import hr.tvz.cmsskola.data.claim.ClaimUtils.Action;
import hr.tvz.cmsskola.data.claim.ClaimUtils.Level;
import hr.tvz.cmsskola.data.role.Role;
import hr.tvz.cmsskola.data.user.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "claim")
public class Claim implements GrantedAuthority {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "role")
  private Role role;

  @ManyToOne
  @JoinColumn(name = "user")
  private User user;

  @ManyToOne
  @JoinColumn(name = "category")
  private Category category;

  private String operation;

  @Column(name = "level")
  private Level level;

  @Column(name = "action")
  private Action action;

  @Override
  public String getAuthority() {
    return ClaimUtils.extractAuthority(this);
  }
}
